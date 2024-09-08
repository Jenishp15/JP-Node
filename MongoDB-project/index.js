const express = require("express")
const connection = require("./db")
// const UserRouter = require("./controller/user.controller")
const UserRouter = require("./routes/user.routes")
const app = express()
app.use(express.json())
const cors = require("cors")

app.use(cors())

const env=require("dotenv")
env.config()

app.use("/user", UserRouter)

app.listen(process.env.PORT || 8080 ,async()=>{
    try {
        await connection
        console.log("Server is running")
        console.log(">>>> connected to DB >>>>>>>")
    } catch (error) {
        console.log(error)
    }
})