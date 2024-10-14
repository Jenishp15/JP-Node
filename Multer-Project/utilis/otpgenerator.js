const otpGenerator = require("otp-generator")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const createOtp = (user) => {
    const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    
    const token = jwt.sign({ user, otpGenerator: otp },process.env.privatekey_Varification);

    return {token, otp}
};

module.exports = createOtp; 