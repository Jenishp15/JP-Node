const nodemailer = require("nodemailer");
const env = require("dotenv")
env.config()

async function sendmail(email, htmltemplate) {

    const transporter = nodemailer.createTransport({
        services: process.env.SERVICES,
        auth: {
            user: process.env.HOST,
            pass: process.env.HOSTPASS,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: process.env.HOST, 
            to: email, 
            subject: "Verification ✔", 
            html: htmltemplate
        });
        console.log("Message sent: %s");
    } catch (error) {
        console.log(error);
    }

}

module.exports = sendmail