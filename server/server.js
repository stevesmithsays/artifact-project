require ('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const massive = require("massive");
const Auth0Strategy = require('passport-auth0');
const cookieParser = require('cookie-parser');
//path is part of node
const path = require('path');

//server port
const port = 3002;

//initialize express
const app = express();

//hooking up to the database
massive(process.env.CONNECTION_STRING).then( (db) => {
    app.set('db', db);
}).catch( (err) => {console.log(err);});

//Top level middlewares
app.use( json());
app.use( cors());
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 100000
    }

}));

//auth0strategy setup
//Checking if the user is in the database with getUserByAuthId query. If not, creatUser query will fire off and add the person into the database.
app.use(passport.initialize());
app.use(passport.session());


passport.use(new Auth0Strategy({
    domain: process.env.DOMAIN,
    clientSecret: process.env.CLIENT_SECRET,
    clientID: process.env.CLIENT_ID,
    scope: 'openid profile',
    callbackURL: "/auth"
}, (accessToken, refreshToken, extraParams, profile, done) => {  
    app.get('db').getUserByAuthId([profile.id]).then( response => {        
        if(!response[0]){
            app.get('db').createUser([profile.id, profile.displayName]).then(createdUser => done(null, createdUser[0]));            
        } else {
            return done(null, response[0]);
           
        }

    })
}))

//passport
passport.serializeUser( (user, done) => done(null,user));
passport.deserializeUser( (user, done) => done(null, user));


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
app.get('/api/currentuser', (req, res) => {  
    //pulls req.user from the current user after logging in.
    console.log("THIS IS THE REQUEST OBJECT from CurrentUser ", req.user);
    if( req.user) res.status(200).json(req.user);
    else res.status(400).json({message: "User Not Logged In."})
      .catch(console.log())      
   
})

//products endpoint from shop.js
app.get('/api/getProducts', (req, res) => {
    req.app
      .get("db")
      .selectAllProducts()
      .then((response) => {
        res.json(response);
      })
      .catch(err => {
        res.status(500).json(err);
      })
})



//setting up the server to listen
app.listen(port, () => {
    console.log(`awaiting your orders on port ${port}`)
});
