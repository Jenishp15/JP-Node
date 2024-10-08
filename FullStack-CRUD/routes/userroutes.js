const express = require("express")

const { UserRegister, UserVerify, UserLogin } = require("../controller/user.controller")

const UserRouter = express.Router()

UserRouter.post("/register",UserRegister)
UserRouter.post("/verification",UserVerify)
UserRouter.post("/login",UserLogin)

module.exports=UserRouter