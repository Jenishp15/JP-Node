const express = require("express")
const { connection } = require("./db")
const UserRouter = require("./routes/user.routes")
const cookieparser = require("cookie-parser")
const dotenv = require("dotenv")
const postRouter = require("./routes/post.routes")
const CommentRouter = require("./routes/comments.routes")
dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieparser())

// Routes Part
app.use("/user",UserRouter)
app.use("/post",postRouter)
app.use("/comment",CommentRouter)

app.listen(process.env.PORT, async ()=>{
    try {
        await connection
        console.log("Server is running")
        console.log(">>>>>> connected to db <<<<<")
    } catch (error) {
        console.log(error)
    }

})