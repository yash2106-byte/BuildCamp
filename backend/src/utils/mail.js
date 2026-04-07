import Mailgen from "mailgen";



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
    FogetPasswordMailgenContent
}