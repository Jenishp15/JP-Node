const bookModel = require("../model/bookmodel")

const bookShow =  async (req, res) => {
    try {
        const userdata = await bookModel.find()
        res.status(200).json({message:userdata})
     } catch (error) {
         res.status(400).json({message:error.message})
     }
}

const bookAdd = async(req,res)=>{

    const {title,author,price,description,ISBN} = req.body
    try {
        const singledata = bookModel({title,author,price,description,ISBN})
        await singledata.save()
        res.status(200).json({message:"Book added successfully"})   
    } catch (error) {
        res.status(400).json({message:error.message})   
    }
}

const bookupdate = async (req,res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const updateddata = await bookModel.findByIdAndUpdate(id,data)
        if(updateddata){
            res.status(200).json({message:"updated successfully"})
        }else{
            res.send("no")
        }
            
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const bookDelete = async (req, res) => {

    const {id} = req.params
    try {
        const deleteditem =await bookModel.findByIdAndDelete(id)  
        res.status(200).json({message:"data deleted"})
    } catch (error) {
        res.status(400).json({ message: error.message })

    }
}

module.exports = {bookAdd,bookDelete,bookShow,bookupdate}