const rollValidator=(req,res,next) => {
    const roll = req.user.roll

        if(roll!="admin"){
            return res.status(400).json({message:"You are Unauthorized"})
        }
        next();
}

module.exports = rollValidator