// const nodemailer = require("nodemailer");
const env = require("dotenv")
env.config()

    const transporter = nodemailer.createTransport({
        auth: {
            user: process.env.HOST,
            pass: process.env.HOSTPASS,
        },
    });

    async function SendEmail(email,htmltemplate){

        const info = await transporter.sendMail({
            from: process.env.HOST, 
            to: email, 
            subject: "Verification ✔", 
            html: htmltemplate
        });
        console.log("Message sent: %s");
    }

// module.exports = SendEmail