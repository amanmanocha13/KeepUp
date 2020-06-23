const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
},function(email,password,done){  //function which sets req.user
    User.findOne({email:email},function(err,user){
        if(err){
            console.log("Error in finding user --> passport : ",err);
            return done(err);
        }
        if(!user || user.password != password){  //if password don't match don't set req.user
            console.log("Invalid username/password");
            return done(null,false);
        }
        return done(null,user);
    });
}));

passport.serializeUser(function(user,done){ //to serialize user and store user id in session cookie
     done(null,user.id);
});
passport.deserializeUser(function(id,done){ //to deserialize user whenever request comes and then finding user using the id
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in deserializing user : ",err);
            return done(err);
        }
        return done(null,user);
    }) 
});

//function to check authentication will be used as middleware
passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        console.log("User Authenticated Successfully");
        return next();
    }
    console.log("User not authenticated");
    return res.redirect('/');
}
//function to set res.locals.user from req.user
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
        delete(res.locals.user.password);
        console.log(res.locals.user);
    }
    next();
}