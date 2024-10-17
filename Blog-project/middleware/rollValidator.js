const rollValidator=(req,res,next) => {
    const role = req.user.role

        if(role!="admin"){
            return res.status(400).json({message:"You are Unauthorized"})
        }
        next();
}

module.exports = rollValidator