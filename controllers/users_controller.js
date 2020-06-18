const User = require('../models/user');

//action to create a new user
module.exports.create = function(req,res){
    User.findOne({ email: req.body.email },function(err,user){
        if(err){
            console.log("Error in finding user : ",err);
            return;
        }
        if(!user){ //only create user if it does not exists
            User.create(req.body,function(err,user){
                if(err){
                    console.log("Error in creating user : ",err);
                    return;
                }
                req.flash('success','Account successfully created. Log in to continue');
                return res.redirect('/signin');
            })
        }else{
            req.flash('error','Account already exists. Log in to continue');
            return res.redirect('/signin');
        }
    })
}
//action to create session
module.exports.createSession = function(req,res){
    req.flash('success','Logged in successfully');
    return res.redirect('/lists');
}
//action to destroy session
module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success',"Logged out successfully");
    return res.redirect('/');
}
