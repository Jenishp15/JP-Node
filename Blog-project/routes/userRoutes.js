const express = require("express")

const { UserRegister, UserLogout, UserLogin } = require("../controller/user.controller")

const UserRouter = express.Router()

UserRouter.post("/register",UserRegister)
UserRouter.post("/login",UserLogin)
UserRouter.get("/logout",UserLogout)

module.exports=UserRouter