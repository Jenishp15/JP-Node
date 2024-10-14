const PostModel = require("../model/post.model")

const CreatePost = async (req, res) => {
    if (!req.body.title || !req.body.content) {
        return res.status(400).json({ message: "please fill all fields" })
    }

    if (req.body.userId) {
        return res.status(400).json({ message: "Invalid requst" })
    }
    try {
        const post = PostModel.create({ ...req.body, userId: req.user._id })
        return res.status(200).json({ message: "Post created successfully" })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

}

const deletePost = async (req, res) => {
    if (req.user._id != req.params.userId) {
        return res.status(400).json({ message: "you are not autherized" })
    }
    try {
        const post = await PostModel.findOne({_id:req.params.postId})
        if(!post){
            return res.status(400).json({message:"post not available"})
        }
        const deletedPost = await PostModel.findByIdAndDelete({_id:req.params.postId})
        return res.status(200).json({message:"post deleted successfully", deletedPost})
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const updatePost = async (req, res) => {
    const {filename} = req.filename
    if (req.user._id != req.params.userId) {
        return res.status(400).json({ message: "you are not autherized" })
    }
    try {
        const post = await PostModel.findOne({_id:req.params.postId})
        if(!post){
            return res.status(400).json({message:"post not available"})
        }
        const updatedPost = await PostModel.findByIdAndUpdate(req.params.postId,{$set:{...req.body,blogImage:filename}})
        return res.status(200).json({message:"post Updated successfully", updatedPost})
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

module.exports = { CreatePost, deletePost, updatePost }