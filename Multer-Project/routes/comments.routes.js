const express = require("express")
const { CreateComment, GetComment, EditComment, DeleteComment, GetTotalComment, Likes } = require("../controller/comment.controller")
const isAuth = require("../middleware/auth")
const CheckRole = require("../middleware/role")

const CommentRouter = express.Router()

CommentRouter.post("/create/:userId",isAuth,CreateComment)
CommentRouter.get("/getcomment/:postId",isAuth,GetComment)
CommentRouter.patch("/edit/:commentId/:userId",isAuth,EditComment)
CommentRouter.delete("/delete/:commentId/:userId",isAuth,DeleteComment)
CommentRouter.get("/get-total-comment",isAuth,CheckRole,GetTotalComment)
CommentRouter.patch("/likes/:commentId/:userId",isAuth,Likes)

module.exports=CommentRouter