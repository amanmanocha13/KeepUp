const nodemailer = require('../config/nodemailer');

//mailer to send mail with link to update password
module.exports.forgotPassword = function(user){
    console.log('User details are : ',user);
    let htmlString = nodemailer.renderedTemplate(user,'/password/forgot_password_mail.ejs');
    nodemailer.transporter.sendMail({
        from: '"Keep Up" <aman.manocha97@gmail.com>',
        to: user.email,
        subject: "Keep Up Password Reset",
        html: htmlString
    },function(err,info){
        if(err){
            console.log('Error in sending mail : ',err);
            return;
        }
        console.log(info);
        return;
    });
}

//mailer to notify user that password has been changed successfully
module.exports.updatedPassword = function(user){
    console.log('User details are : ',user);
    let htmlString = nodemailer.renderedTemplate(user,'/password/updated_password_mail.ejs');
    nodemailer.transporter.sendMail({
        from: '"Keep Up" <aman.manocha97@gmail.com>',
        to: user.email,
        subject: "Keep Up Password Changed",
        html: htmlString
    },function(err,info){
        if(err){
            console.log('Error in sending mail : ',err);
            return;
        }
        console.log(info);
        return;
    });
}