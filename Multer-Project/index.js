const express = require("express")
const { connection } = require("./db")
const UserRouter = require("./routes/user.Routes")
const cookieparser = require("cookie-parser")
const dotenv = require("dotenv")
const postRouter = require("./routes/post.routes")
dotenv.config()

const app = express()

app.use(cookieparser())
app.use(express.json())

// Routes Part
app.use("/user",UserRouter)
app.use("/post",postRouter)

app.listen(process.env.PORT, async ()=>{
    try {
        await connection
        console.log("Server is running")
        console.log(">>>>>> connected to db <<<<<")
    } catch (error) {
        console.log(error)
    }

})