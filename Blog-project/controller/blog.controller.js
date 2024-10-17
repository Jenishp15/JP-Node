const BlogModel = require("../models/BlogModel")
const env = require("dotenv")
env.config()

const BlogCreate = async (req, res) => {
    const { title, author, content, tags, published_date } = req.body
    try {
        await BlogModel.create({ title, author, content, tags, published_date, userId:req.user._id })
        res.status(200).json({ message: "Blog Created successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const BlogUpdate = async (req, res) => {
    
    const blogid = req.params.blogId
    const userid = req.user._id
    try {
        const data = await BlogModel.findOne({  _id:blogid, userId: userid })
        if (!data) {
            return res.status(400).json({ message: "Please login" })
        }
        const updateddata = await BlogModel.findByIdAndUpdate({_id:blogid , userId:userid}, req.body)
        if (!updateddata) {
            return res.status(400).json({ message: "Blog not found" })
        }
        res.status(200).json({ message: "Blog Updated successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

const BlogDelete = async (req, res) => {

    const blogid = req.params.blogId
    const userid = req.user._id

    try {

        const data = await BlogModel.findOne({ userId: userid, _id:blogid  })
        if (!data) {
            return res.status(400).json({ message: "Please login" })
        }

        const deleteddata = await BlogModel.findByIdAndDelete({_id: req.params.blogId})

        if (!deleteddata) {
            return res.status(400).json({ message: "Blog not found" })
        }

        res.status(200).json({ message: "Blog Deleted successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

const GetBlogs = async (req,res) =>{
    const userid = req.user._id

    try {
        const data = await BlogModel.find({ userId: userid})
        if (!data) {
            return res.status(400).json({ message: "Your Data not found" })
        }
             
        res.status(200).json({ message: "Blog Display successfully",blogs:data })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const blogdeletebyAdmin = async (req,res) => {
    try {
        const data = await BlogModel.findOne({_id:req.params.blogId})
        if(!data){
            return res.status(400).json({message:"No data available" })
        }
        console.log(data);
        
        await BlogModel.findByIdAndDelete({_id:req.params.blogId})
        res.status(200).json({message:"blog deleted"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const AllBlogGet = async (req,res) => {
    try {
        const AllData = await BlogModel.find()
            if(!AllData){
                return res.status(400).json({message:"No data available" })
            }

        res.status(200).json({message:"all blogs here", AllData })
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const AdminBlogUpdate = async (req, res) => {
    
    try {
        const updateddata = await BlogModel.findByIdAndUpdate({_id:req.params.blogId},req.body)
        if (!updateddata) {
            return res.status(400).json({ message: "Blog not found" })
        }
        res.status(200).json({ message: "Blog Updated successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

module.exports = { BlogCreate, BlogUpdate, BlogDelete, GetBlogs, blogdeletebyAdmin, AllBlogGet, AdminBlogUpdate}