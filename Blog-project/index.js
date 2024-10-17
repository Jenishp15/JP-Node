const express = require("express")
const app = express()
const connection = require("./db")
const UserRouter = require("./routes/userRoutes")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const BlogRouter = require("./routes/BlogRoutes")
dotenv.config()

app.use(express.json())
app.use(cookieParser())

app.use("/user",UserRouter)
app.use("/blog",BlogRouter)


app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("connected to db")
        console.log(">>>>>>>>>> server is running <<<<<<<<<<")
    } catch (error) {
        console.log(error)
    }
})