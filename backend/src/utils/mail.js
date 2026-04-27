// This is the file where we will design the body of our email which will be send to users when they will login for the first time or when they will reset the password
// this is just a template , for actually sending these mails we'll use "AWS SES" or "Brevo" but if we are just testing thenwe should prefer "mailtrap"

import Mailgen from "mailgen";

// THIS IS HOW WE WILL SEND THE EMAIL WHICH WE HAVE GENRATED BELOW
import nodemailer from "nodemailer"

const sendEmail = async (options)=>{
    // this part has nothing to do with sending the mail it is just branding 
    const mailGenrator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://your-app-link.com"
        }
    })
    
    const emailTextual = mailGenrator.generatePlaintext(options.mailgenContent)// this is for thoese people whose mail doent support html file
    const emailHTML = mailGenrator.generate(options.mailgenContent)// this is the mail in the html format

    const transpoter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port:process.env.MAILTRAP_SMTP_PORT,
        auth:{
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS
        }
    })

    const mail = {
        from: "mail.sendermail@BaseCamp.com",
        to: options.email,
        subject: options.subject,
        text: options.emailTextual,
        html: options.emailHTML
    }

    try {
        await transpoter.sendMail(mail)
    } catch (error) {
        console.error("Email Service has failed silently because of an invalid credit")
        console.error("Error:" ,error)
        
    }
}

const emailVerficationMailgenContent = (username,verficationUrl)=>{
    return {
        body:username,
        intro:"Welcome to BaseCamp! We're very excited to have you on board. ",
        action: {
            instructions: 'To get started with us , please click on the following button:',
            button: {
                color: '#005424', // Optional action button color
                text: 'Verify your Email',
                link: 'verficationUrl'
            },
        },
        outro: "Need help, or have questions? Just reply to this email, we'd love to help."

    }
}
 
const FogetPasswordMailgenContent = (username,passwordRestUrl)=>{
    return {
        body:username,
        intro:"We got a request to reset your password of your account ",
        action: {
            instructions: 'To reset the password , please click on the following button:',
            button: {
                color: '#e70d0a', 
                text: 'Reset Password',
                link: 'passwordRestUrl'
            },
        },
        outro: "Need help, or have questions? Just reply to this email, we'd love to help."

    }
}

export{
    emailVerficationMailgenContent,
    FogetPasswordMailgenContent,
    sendEmail
}