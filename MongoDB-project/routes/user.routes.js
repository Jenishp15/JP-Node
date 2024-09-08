const express= require("express")
const UserRouter = express.Router()
const env = require("dotenv")
const {getuserdata,userregistraion,userlogin,deleteuser,updateuser} = require("../controller/user.controller")
env.config()


UserRouter.get("/getdata",getuserdata)

UserRouter.post("/registration",userregistraion)

UserRouter.post("/login",userlogin)

UserRouter.patch("/update/:id",updateuser)

UserRouter.delete("/delete/:id",deleteuser)

module.exports=UserRouter