const express = require("express")
const connection = require("./db")
const bookRoutes = require("./Backend/routes/bookroutes")
const app = express()
const env = require("dotenv")
env.config()

app.use(express.json())
app.use("/book",bookRoutes)

app.listen(process.env.PORT || 3000,async ()=>{
    
    try {
        await connection
        console.log("server is running")
        console.log(">>>>>>>>>>> Connected to db <<<<<<<<<") 
    } catch (error) {
        console.log(error)
    }
})