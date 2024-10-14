const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const isAuth = (req,res,next) => {
    const {Access_Token} = req.cookies

    jwt.verify(Access_Token,process.env.privatekey_AToken,function(err,decode){
        if(err){
            return res.status(400).json({message:err.message})
        }
        // console.log(decode.userdata);
        
        const user = decode.userdata;
        req.user = user;
        next();
    })
}

module.exports = isAuth