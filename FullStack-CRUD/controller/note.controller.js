const NoteModel = require("../models/noteModel")
const env = require("dotenv")
env.config()

const notesCreate = async (req, res) => {
    const { title, body } = req.body

    try {
        await NoteModel.create({ title, body, userId: req.user?._id })
        res.status(200).json({ message: "Note Created successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const notesUpdate = async (req, res) => {
    
    const noteid = req.params.noteId
    const userid = req.user._id

    try {
        const data = await NoteModel.findOne({ userId: userid, _id:noteid  })
        if (!data) {
            return res.status(400).json({ message: "Please login" })
        }
        const updateddata = await NoteModel.findByIdAndUpdate({ _id: req.params.noteId }, req.body)
        if (!updateddata) {
            return res.status(400).json({ message: "Note not found" })
        }
        res.status(200).json({ message: "Note Updated successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

const notesDelete = async (req, res) => {

    const noteid = req.params.noteId
    const userid = req.user._id

    try {

        const data = await NoteModel.findOne({ userId: userid, _id:noteid  })
        if (!data) {
            return res.status(400).json({ message: "Please login" })
        }

        const deleteddata = await NoteModel.findByIdAndDelete({_id: req.params.noteId})

        if (!deleteddata) {
            return res.status(400).json({ message: "Note not found" })
        }

        res.status(200).json({ message: "Note Deleted successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

const getNotes = async (req,res) =>{
    const userid = req.user._id

    try {
        const data = await NoteModel.find({ userId: userid})
        if (!data) {
            return res.status(400).json({ message: "Data not found" })
        }
        console.log(data);
        
        res.status(200).json({ message: "Note Display successfully",notes:data })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const allnoteDelete = async (req,res) => {
    try {
        const delData = await NoteModel.deleteMany()
        if(!delData){
            return res.status(400).json({message:"No data available" })
        }
        res.status(200).json({message:"all notes deleted"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const allnoteGet = async (req,res) => {
    try {
        const AllData = await NoteModel.find()
            if(!AllData){
                return res.status(400).json({message:"No data available" })
            }

        res.status(200).json({message:"all notes here", AllData })
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

module.exports = { notesCreate, notesDelete, notesUpdate, getNotes, allnoteDelete, allnoteGet }