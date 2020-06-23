const passport = require('passport');
const facebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user'); 
const crypto = require('crypto');
const env = require('./environment');

passport.use(new facebookStrategy({
    clientID: env.facebook_clientID,
    clientSecret: env.facebook_clientSecret,
    callbackURL: "http://localhost:8000/users/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email', 'birthday'] //fields which we want as data from fb
},
function(accessToken,refreshToken,profile,done){
    console.log(profile);
    User.findOne({
        email: profile.emails[0].value
    }).exec(function(err,user){
        if(err){
            console.log('Error in authentication using facebook : ',err);
            return done(err);
        }
        if(user){
            return done(null,user);
        }else{
            User.create({    //creating user if user does not exist in our local db
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')   //setting random password using crypto
            },function(err,user){
                if(err){
                    console.log('Error in creating user : ',err);
                    return;
                }
                return done(null,user);
            });
        }
    })
}
));


module.exports = passport;