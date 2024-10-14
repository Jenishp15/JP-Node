const CheckRole = (req,res,next) => {
    const {role} = req.user;

    if(role != "admin"){
        return res.status(400).json({message:"Access denied"})
    }
    next();
}

module.exports = CheckRole 