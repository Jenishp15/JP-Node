const CommentModel = require("../model/comment.model")

const CreateComment = async (req,res) => {
    const {userId,postId,content} = req.body

    if(req.user._id != req.params.userId){
        res.status(400).json*{message:"you are not authorized to create comment "}
    }

    if(!userId || !postId || !content ){
        res.status(400).json({message:" please fill all field "})
    }

    try {
        const comment = await CommentModel.create({userId ,postId, content})
        res.status(200).json({message:" Comment crated successfully",comment})
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}

const GetComment = async (req,res) => {
    try {
        const comment = await CommentModel.find({postId:req.params.postId})
        if(!comment){
            return res.status(400).json({message:"comment not found"})
        }

        const totalcomment = await CommentModel.countDocuments({postId:req.params.postId})
        res.status(200).json({message:"Comment fetched ", comment,totalcomment})

    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const EditComment = async (req,res) => {
    
    if(req.body.userId || req.body.postId){
        res.status(400).json*{message:"you are not authorized to Edit comment "}
    }

    if(req.user._id != req.params.userId){
        res.status(400).json*{message:"you are not authorized to Edit comment "}
    }

    try {
        const comment = await CommentModel.findById(req.params.commentId)
        if(!comment){
            return res.status(400).json({message:"comment not found"})
        }
        await CommentModel.findByIdAndUpdate(req.params.commentId,{$set:{content:req.body.content}})
        return res.status(200).json({message:"comment Updated successfully "})    
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const DeleteComment = async (req,res) => {

    if(req.user._id != req.params.userId || req.user.role!="admin"){
    return res.status(400).json({message:"you are not authorized to Delete comment "})
    }

    if(req.body.userId || req.body.postId){
        return res.status(400).json*{message:"you are not authorized to Delete comment "}
    }

    try {
        const comment = await CommentModel.findById(req.params.commentId)
        if(!comment){
            return res.status(400).json({message:"comment not found"})
        }
        await CommentModel.findByIdAndDelete(req.params.commentId)
        return res.status(200).json({message:"comment Delete successfully "})    
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const GetTotalComment = async (req,res) => {
    try {
        const comment = await CommentModel.find().limit(req.query.limit || 5 ).skip( req.query.limit || 0 ).sort({createedAt: -1});

        if(!comment){
            return res.status(400).json({message:"comment not found"})
        }
        res.status(200).json({message:"Total comments here",comment})    
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const Likes = async (req,res) => {
    try {
        const comment = await CommentModel.find().limit(req.query.limit || 5 ).skip( req.query.limit || 0 ).sort({createedAt: -1});

        if(!comment){
            return res.status(400).json({message:"comment not found"})
        }

        const index = comment.likes.indexOf(req.params.userId) 

        if(index==-1){
            comment.likes.push(req.params.userId)
            comment.NumberOfLike +=1
        }else{
            comment.likes.splice(index,1)
            comment.NumberOfLike -=1
        }

        await comment.save()
        res.status(200).json({message:"Comment liked successfully"})    

    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

module.exports = {CreateComment, GetComment, EditComment, DeleteComment, GetTotalComment, Likes}