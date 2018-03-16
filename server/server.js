require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const massive = require("massive");
const Auth0Strategy = require("passport-auth0");
const {STRIPE_SECRET_KEY, CONNECTION_STRING, SESSION_SECRET, DOMAIN, CLIENT_SECRET, CLIENT_ID} = process.env;


//server side stripe being set up here
const configureStripe = require('stripe');

const stripe = configureStripe(STRIPE_SECRET_KEY);

//saves current user on the server side
let loggedInUser = [];
let products = [];


//server port
const port = 3002;

//initialize express
const app = express();

//express static build
//app.use(express.static(`${__dirname}/../build`));

//hooking up to the database
massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(err => {
    console.log(err);
  });

//Top level middlewares
app.use(cors());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 100000
    }
  })
);

//auth0strategy setup
//Checking if the user is in the database with getUserByAuthId query. If not, createUser query will fire off and add the person into the database.
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain: DOMAIN,
      clientSecret: CLIENT_SECRET,
      clientID: CLIENT_ID,      
      callbackURL: "/auth"
    },
    (accessToken, refreshToken, extraParams, profile, done) => {     
      app
        .get("db")
        .getUserByAuthId([profile.id])
        .then(response => {
          if (!response[0]) {
            app
              .get("db")
              .createUser([profile.id, profile.displayName])
              .then(createdUser => done(null, createdUser[0]));
          } else {
            return done(null, response[0]);
          }
        });
    }
  )
);

//bodyparser middleware
app.use(json());

//passport
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

//ENDPOINTS

//auth 
app.get(
  "/auth",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/#/",
    failureRedirect: "/auth",
    failureFlash: true
  })
);

//logout endpoint
app.get("/api/logout", (req, res, next) => {
  req.logout();
  req.session.destroy(() => {
    res.redirect("/#/");
  });
});

//endpoint for current user's data to be stored in the redux store
app.get("/api/currentuser", (req, res, next) => {
  //pulls req.user from the current user after logging in.
  if (req.user) {
    loggedInUser.push(req.user);
    res.status(200).json(req.user);
  } else {
    res.status(400).json({ message: "User Not Logged In." });
  }
});

//products endpoint from shop.js
app.get("/api/products", (req, res, next) => {
  req.app
    .get("db")
    .selectAllProducts()
    .then(response => {
      products.push(response);
      res.json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//cart endpoint from product.js
app.post("/api/addtocart", (req, res, next) => {
  const userId = loggedInUser[0].id;
  const productId = req.body.product_id;
  const price = req.body.unit_price;
  
  req.app
    .get("db")
    .addItemToCart(userId, productId, price)
    .then(cart => {
      res.status(200).json(cart);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//cart endpoint for getting the current user's cart
app.get("/api/getcart", (req, res, next) => {
  const userId = req.user.id;
  req.app
    .get("db")
    .getCart(userId)
    .then(cart => {
      res.status(200).json(cart);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//cart endpoint for deleting an item from user's cart
app.delete(`/api/cart/:productId`, (req, res, next) => { 
  const userId = req.user.id;
  const productId = req.body.product;  
  req.app
    .get("db")
    .deleteItemFromCart(userId, productId)
    .then(cart => {
      res.status(200).json(cart);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//cart endpoint for updating user's profile
app.put(`/api/profile/:id`, (req, res, next) => {
  const style = req.body.favorite_style;
  const origin = req.body.favorite_origin;
  const id = req.user.id;
  console.log(id, style, origin);
  req.app.get("db").updateProfile(style, origin, id).then((profile) => {
    res.status(200).json(profile);
  }).catch(err => {
    res.status(500).json(err);
  });
});

//Handles response from stripe on the endpoint below
const postStripeCharge = res => (stripeErr, stripeRes) => {
    if (stripeErr) {
        res.status(500).json({error: stripeErr});

    } else {
        res.status(200).json({success: stripeRes});
    }
}



//endpoint for handling payments through Stripe
app.post('/api/cart/checkout', (req, res) => { 
        stripe.charges.create(req.body, postStripeCharge(res));
    });


//path is part of node
const path = require("path");

//if a get request is made to the server, but it isn't to a valid endpoint, go to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

//setting up the server to listen
app.listen(port, () => {
  console.log(`awaiting your orders on port ${port}`);
});
