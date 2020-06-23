const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const crypto = require('crypto');
const env = require('./environment');

passport.use(new googleStrategy({
    clientID: env.google_clientID,
    clientSecret: env.google_clientSecret,
    callbackURL: 'https://keep-up-todo-app.herokuapp.com/users/auth/google/callback'    
},
function(accessToken,refreshToken,profile,done){
    User.findOne({email: profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log('Error in google authentication : ',err);
            return;
        }
        console.log(profile);
        if(user){
            return done(null,user);  //error is null and sending user to null this is where req.user is set
        }else{
            User.create({   //creating user if user does not exist in our local db
                name: profile.displayName,
                email: profile.emails.value[0],
                password: crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){
                    console.log('Error in creating user: ',err);
                    return;
                }
                return done(null,user);
            })
        }
    });
}))

module.exports = passport;