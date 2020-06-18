const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const crypto = require('crypto');

passport.use(new googleStrategy({
    clientID: '354362540622-a9k8ig1v1bpr7dj190ebq37agrfj282h.apps.googleusercontent.com',
    clientSecret: '5wvJENknJhDZx4jX6lXiWwUg',
    callbackURL: 'http://localhost:8000/users/auth/google/callback'    
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