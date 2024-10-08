const express = require("express")
const app = express()
const connection = require("./db")
const UserRouter = require("./routes/userroutes")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const NoteRouter = require("./routes/noteRoutes")
dotenv.config()

app.use(express.json())
app.use(cookieParser())
app.use("/user",UserRouter)
app.use("/note",NoteRouter)


app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("connected to db")
        console.log(">>>>>>>>>> server is running <<<<<<<<<<")
    } catch (error) {
        console.log(error)
    }
})