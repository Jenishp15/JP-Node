const mongoose = require("mongoose")

const CommentSchema = mongoose.Schema({
    postId:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true
    },
    likes:{
        type:Array,
        default:[]
    },
    NumberOfLike:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

const CommentModel = mongoose.model("comment",CommentSchema)

module.exports = CommentModel