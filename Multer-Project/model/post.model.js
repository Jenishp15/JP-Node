const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    },
    blogImage:{
        type:String,
        default:"https://img.freepik.com/free-vector/blog-post-concept-illustration_114360-26355.jpg"
    }
},{
    timestamps:true,
    versionKey:false
})

const PostModel = mongoose.model("post",postSchema)

module.exports = PostModel