const http = require("http")
const fs = require("fs")

const server = http.createServer((req,res)=>{
    if(req.url=="/" || req.url=="/home"){
        res.end("Welcome to Home Page")
    }else if(req.url=="/about"){
        res.end("Welcome to About Page")
    }else if(req.url=="/getproductdata"){
        fs.readFile("./db.json","utf8",(err,data)=>{
            if(err){
                res.end("data not found")
            }else{
                res.end(data)
            }
        })
    }else if(req.url=="/user"){
        fs.readFile("./db.json","utf8",(err,data)=>{
            if(err){
                res.end("data not found")
            }else{
                res.end(data)
            }
        })
    }
    else{
        res.end("something want wrong")
    }
})

server.listen(8080,()=>{
    console.log("server running");
})