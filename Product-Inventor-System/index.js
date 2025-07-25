const express = require("express");
const { connection } = require("./db");
const ProductRouter = require("./Controller/product");


const app=express()
app.use(express.json())

app.use("/product",ProductRouter)

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("server is running");
        console.log("DB is connected");
    } catch (error) {
        console.log(error);
    }
    
})