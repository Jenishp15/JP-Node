const express = require("express")
const { CreatePost, deletePost ,updatePost } = require("../controller/post.controller")
const isAuth = require("../middleware/auth")
const CheckRole = require("../middleware/role")
const upload = require("../utilis/multer")

const postRouter = express.Router()

postRouter.post("/create",isAuth,CheckRole,CreatePost)
postRouter.delete("/deletepost/:postId/:userId",isAuth,CheckRole,deletePost)
postRouter.patch("/updatepost/:postId/:userId",isAuth,CheckRole,upload.single("blogImage"),updatePost)

module.exports = postRouter
