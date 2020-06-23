//config file to set up node mailer
const nodemailer = require('nodemailer');
const ejs  = require('ejs');
const path = require('path');
const env = require('./environment');

//creating transporter to send mail
let transporter  = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: env.email_id, //TODO: enter email id
        pass: env.email_pass //TODO: enter email password
    }
});

//function to render ejs template
let renderedTemplate = function(data,relativePath){
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('Error in rendering template : ',err);
                return;
            }
            mailHtml = template;
        }
    )
    return mailHtml;
};

module.exports ={
    transporter: transporter,
    renderedTemplate: renderedTemplate
}