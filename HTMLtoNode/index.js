const express = require("express")
const app = express()
const connection = require("./db")
const ProductRouter = require("./router/productrouter")
const ConatctRouter = require("./router/conatctrouter")

const env= require("dotenv")
env.config()

app.use(express.json())

app.use("/product",ProductRouter)
app.use("/contact",ConatctRouter)


app.listen(process.env.PORT || 3000 ,async()=>{
    try {
        await connection
        console.log("connected to db")
        console.log(">>>>>>>>>> server is running <<<<<<<<<<")
    } catch (error) {
        console.log(error)
    }
})
