const express = require("express")
const app = express()
const env = require("dotenv")
const connection = require("./db")
const cookieParser = require("cookie-parser")
const UserRouter = require("./backend/controller/user")
const MovieRouter = require("./backend/routes/movieRoutes")
env.config()

app.use(express.json())
app.use(cookieParser())
app.use("/movie",MovieRouter)
app.use("/auth",UserRouter)

app.listen(process.env.PORT, ()=>{
    try {
        connection
        console.log("Server is running")
        console.log(">>>>>>> connected to server <<<<<<<<")
    } catch (error) {
        console.log("Something went wrong")
    }
})