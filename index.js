const express = require('express');
const port = process.env.PORT || 8000;
const app = express();
const db = require('./config/mongoose');  
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy'); // for local authentication
const passportGoogleStrategy = require('./config/passport-google-oauth2-startegy');  //for authentication using google
const passportFacebookStrategy = require('./config/passport-facebook-strategy'); //for authentication using facebook 
const MongoStore = require('connect-mongo')(session);   //monog store to store session detail in db
const flash = require('connect-flash');   //flash for notifications
const customMware = require('./config/middleware');  //middleware to set res.flash
const env = require('./config/environment');

app.set('view engine','ejs');
app.set('views','./views');
app.use(expressLayouts);  
app.set('layout extractScripts',true);
app.set('layout extractStyles',true);
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static(process.env.asset_path)); //for static files

app.use(session({
    name: 'KeepUp',
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000*60*100
    },
    store: new MongoStore(
        {
        mongooseConnection: db,
        autoRemove: 'disabled'
        },
        function(err){
            console.log(err ||  'connect mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log('Error in starting server : ',err);
    }
    console.log('Server is up and running on port : ',port);
});