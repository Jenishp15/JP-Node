const contactModel = require("../model/contactmodel")

const contactController = async(req,res)=>{
    const {name,email,message} =req.body

    try {
        const singledata = contactModel({name,email,message})
        await singledata.save()
        res.status(200).json({message:"your message send successfully"})
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

module.exports=contactController