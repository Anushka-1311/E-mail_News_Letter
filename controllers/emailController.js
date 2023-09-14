import hbs from "nodemailer-express-handlebars";
import nodemailer from "nodemailer";
import path from 'path';
import { config } from "dotenv";

config();

const __dirname = path.resolve();

const EMAIL = process.env.EMAIL;

const PASSWORD = process.env.GMAIL_APP_PASSWORD;

const transporter = nodemailer.createTransport({ 
    service:"gmail", 
    host:"smtp.gmail.com",
    secure:true,
    auth:{ 
        user:EMAIL, 
        pass:PASSWORD 
    } 
});

transporter.use('compile',hbs({viewEngine:'nodemailer-express-handlebars', viewPath:path.join(__dirname,'/templates')}));   

const sendMail = (mailOptions) => {
    transporter.sendMail(mailOptions,(err,info) => {
        if(err){
            process.env.NODE_ENV !== 'production' && console.log(err.message)
            return 'Error sending email'
        }
        else{
            process.env.NODE_ENV !== 'production' && console.log(info.response)
            return 'Email Sent'
        }
    })
}

export const welcomeEmail = (name, email) => {
    const mailOptions = {
        from:EMAIL,
        to:email,
        subject:'Welcome Email',
        template:'welcomeEmail',
        context:{
            name:name
        }
    }
    sendMail(mailOptions)
}

export const sendLoginWarningEmail = (name, email) => {
    const mailOptions = {
        from:EMAIL,
        to:email,
        subject:'Suspicious Signin',
        template:'loginWarningEmail',
        context:{
            name:name,
        }
    }
    sendMail(mailOptions)
}

export const sendTemplateEmail = (options, email) => {
    const mailOptions = {
        from:EMAIL,
        to:email,
        subject:options?.subject,
        template:options?.templateName,
        context:options
    }
    sendMail(mailOptions);
}
