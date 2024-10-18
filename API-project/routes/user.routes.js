const express = require("express")
const { GetUser, GetAllUser, UserRegister, UserLogin, UserLogout, UpdateUser, DeleteUser } = require("../controller/user.controller")
const AuthMiddleware = require("../middleware/Auth")
const roleValidator = require("../middleware/rollValidator")

const UserRouter = express()

UserRouter.get("/getuser",AuthMiddleware,GetUser)
UserRouter.get("/getalluser",GetAllUser)

UserRouter.post("/register",UserRegister)
UserRouter.post("/login",UserLogin)
UserRouter.get("/logout",UserLogout)

UserRouter.patch("/updateuser/:userId",AuthMiddleware,roleValidator,UpdateUser)
UserRouter.delete("/deleteuser/:userId",AuthMiddleware,roleValidator,DeleteUser)

module.exports = UserRouter