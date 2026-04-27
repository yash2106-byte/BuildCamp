// This is the file where we will design the body of our email which will be send to users when they will login for the first time or when they will reset the password
// this is just a template , for actually sending these mails we'll use "AWS SES" or "Brevo" but if we are just testing thenwe should prefer "mailtrap"


import Mailgen from "mailgen"
import nodemailer from "nodemailer" // they have better docs on there github page

// this is the just the default branding
const sendEmail = async (options)=>{
    // this part has nothing to do with sending the mail it is just branding 
    const mailGenrator = new Mailgen({
        theme: "default",
        product: {
            name: "Base Camp",
            link: "https://your-app-link.com"
        }
    })


    const emailTextual = mailGenrator.generatePlaintext(options.mailgenContent)// this is for thoese people whose mail doent support html file
    const emailHTML = mailGenrator.generate(options.mailgenContent)// this is the mail in the html format

    // this is the main thing which is helping us to send our email
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
        text: emailTextual,
        html: emailHTML
    }

    try {
        await transpoter.sendMail(mail)
    } catch (error) {
        console.error("Email Service has failed silently because of an invalid credit")
        console.error("Error:" ,error)
        
    }
}



// these are the contents of the emails whic we will be sending
const emailVerificationMailgenContent = (username,verificationUrl)=>{
    return {
        body: {
            name: username,
            intro: "Welcome to our App! we'are excited to have you on board",
            action:{
                instructions: "To verify your email please click on the following button",
                button: {
                    color: "#1aae5aff",
                    text: "Verify your Email",
                    link: verificationUrl
                },
            },
            outro: "Need help or any support? Just reply to this mail",
        },
    };
};

const forgotPasswordMailgenContent = (username,passwordResetUrl)=>{
    return {
        body: {
            name: username,
            intro: "We got a request to reset your password",
            action:{
                instructions: "To reset your password pls click the link given below",
                button: {
                    color: "rgb(235, 1, 1)",
                    text: "reset your password",
                    link: passwordResetUrl
                },
            },
            outro: "If this was not genrated by you! Ignore this",
        },
    };
};


export {
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent,
    sendEmail
}