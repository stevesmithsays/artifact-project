require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const massive = require("massive");
const Auth0Strategy = require("passport-auth0");

//saves current user on the server side
let loggedInUser = [];
let products = [];

//path is part of node
const path = require("path");

//server port
const port = 3002;

//initialize express
const app = express();

//hooking up to the database
massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(err => {
    console.log(err);
  });

//Top level middlewares
app.use(cors());
// app.use(process.env.SESSION_SECRET);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
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
      domain: process.env.DOMAIN,
      clientSecret: process.env.CLIENT_SECRET,
      clientID: process.env.CLIENT_ID,
      // scope: 'openid profile',
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

//auth endpoint
app.get(
  "/auth",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/#/",
    failureRedirect: "http://localhost:3000/#/login",
    failureFlash: true
  })
);

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
  // console.log('SERVER ENDPOINT - productId: ' + typeof productId, 'price: ' + typeof price);
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
  const userId = loggedInUser[0].id;
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
//req.body is empty? productID is undefined...
app.delete(`/api/cart/:productId`, (req, res, next) => { 
  const userId = req.user.id;
  const productId = req.body.product;
  console.log("req body: ", req.body);
  console.log(userId, productId);
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

//setting up the server to listen
app.listen(port, () => {
  console.log(`awaiting your orders on port ${port}`);
});
