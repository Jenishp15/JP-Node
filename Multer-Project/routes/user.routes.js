const express = require("express")
const { Signup, Varification, Signin, Logout, Getuser, Updateuser, getusers, deleteusers } = require("../controller/user.controller")
const isAuth = require("../middleware/auth")
const upload = require("../utilis/multer")
const CheckRole = require("../middleware/role")

const UserRouter = express()

UserRouter.post("/signup",Signup)
UserRouter.post("/verify",Varification)
UserRouter.post("/login",Signin)
UserRouter.post("/logout",Logout)
UserRouter.get("/getdata/:userId",isAuth,Getuser)
UserRouter.patch("/updatedata/:userId",isAuth,upload.single("profileImage"),Updateuser)

// ##### Admin Routes #####

UserRouter.get("/getusers",isAuth,CheckRole,getusers)
UserRouter.delete("/delete/:Id",isAuth,CheckRole,deleteusers)

module.exports = UserRouter