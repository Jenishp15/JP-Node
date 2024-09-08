const express = require("express")
const {connection} = require("./db")

const app=express()


app.listen(8080,async()=>{
    try {
        await connection;
        console.log("server is running")
        console.log("============= Connected to db =============")
        
    } catch (error) {
        
    }
})