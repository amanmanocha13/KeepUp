const User = require('../models/user');
const crypto = require('crypto');
const forgotPassMailer = require('../mailers/forgot_pass_mailer');

module.exports.home = function(req,res){  //action to render home page
    if(req.isAuthenticated()){
        return res.redirect('/lists');
    }
    return res.render('home');
}
module.exports.signIn = function(req,res){ //action to render sign in partial
    
    if(req.isAuthenticated()){
        return res.redirect('/lists');
    }
    
    if(req.xhr){
        return res.render('_signin',{layout: false}); //only rnder partial not full layout
    }
    return res.render('home',{
        signIn: true
    })
}

//action to render sign up partial
module.exports.signUp = function(req,res){
    
    if(req.isAuthenticated()){
        return res.redirect('/lists');
    }
    if(req.xhr){
        return res.render('_signup',{layout: false});
    }
    return res.render('home',{
        signUp: true
    })
}

//action to render email sign up partial
module.exports.emailSignUp = function(req,res){
    
    if(req.isAuthenticated()){
        return res.redirect('/lists');
    }
    if(req.xhr){
        return res.render('_emailSignUp',{layout: false});
    }
    return res.render('home',{
        emailSignUp: true
    })
}

//action to render forgot password patial
module.exports.forgotPassword = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('./lists');
    }
    if(req.xhr){
        return res.render('_forgotPass',{
            layout: false
        })
    }
        return res.render('home',{
            forgotPass: true
        })
    
}

//action which sends user mail with access token
module.exports.forgotPasswordEmail = function(req,res){
    User.findOne({email:req.body.email}).exec(function(err,user){
        if(err){
            console.log('Error in finding user : ',err);
            return;
        }
        if(user){
            user.resetPasswordToken = crypto.randomBytes(20).toString('hex'); //generating random token using crypto
            user.resetPasswordExpires = Date.now() + 600000; //access Token expires in 10 minutes
            user.save();
            forgotPassMailer.forgotPassword({  //calling mailer to send mail
                name: user.name,
                email: user.email,
                resetPasswordToken: user.resetPasswordToken
            });
            return res.render('_forgotPassMailed',{ //rendering partial for further instruction to user
                layout: false
            });
        }else{
            req.flash('error','Email id not registered.Sign Up to continue');
            return res.render('_signup',{   
                layout: false
            });
        }
    })
}

//action to show partial where user can update password if access token is valid
module.exports.updatePasswordPage = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/lists');
    }else{
        User.findOne({
            resetPasswordToken: req.query.accessToken,
            resetPasswordExpires: { $gt: Date.now() }  //passsword expiry time should be less than current time
        }).exec(function(err,user){
            if(err){
                console.log('Error in finding user : ',err);
                return;
            }
            if(!user){
                req.flash('error','Password reset link has expired. Please request a new link below.')
                return res.redirect('/signin/forgot');
            }
            return res.render('home',{
                resetPass: true,
                accessToken: req.query.accessToken
            })
        }); 
    }
}

//action to update password if access token is still valid
module.exports.updatePassword = function(req,res){
    if(req.body.password!=req.body.confirmPassword){
        req.flash('error','Passwords do not match');
        return res.redirect('back');
    }
    let accessToken = req.query.accessToken;
    User.findOne({
        resetPasswordToken: accessToken,
        resetPasswordExpires: {$gt: Date.now()}
    }).exec(function(err,user){
        if(err){
            console.log('Error in updating password : ',err);
            return;
        }
        if(!user){
            req.flash('error','Password reset link has expired. Please request a new link below.')
            return res.redirect('/signin/forgot');
        }
        user.password = req.body.password;
        resetPasswordToken = undefined;  //setting password token to undefined so that user can't use again
        resetPasswordExpires = undefined;
        user.save();
        forgotPassMailer.updatedPassword({
            name: user.name,
            email: user.email
        });
        req.flash('success','Password changed successfully. Log in to continue');
        return res.redirect('/signin');
    });
}