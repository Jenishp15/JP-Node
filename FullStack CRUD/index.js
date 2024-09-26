const express = require("express")
const app = express()
const connection = require("./db")
const UserRouter = require("./routes/userroutes")
const dotenv = require("dotenv")
dotenv.config()

app.use(express.json())
app.use("/user",UserRouter)


app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("connected to db")
        console.log(">>>>>>>>>> server is running <<<<<<<<<<")
    } catch (error) {
        console.log(error)
    }
})