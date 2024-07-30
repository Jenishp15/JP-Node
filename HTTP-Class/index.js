
const http = require("http")

const fs = require("fs")

const server = http.createServer((req,res)=>{
    if(req.url=="/getdata"){
        fs.readFile("./db.json","utf8",(err,data)=>{
                if(err){
                   res.end("data not found")
                }else{
                    res.end(data)
                }
            })
    }else{
        res.end("not found")
    }
})

server.listen(8080,()=>{
    console.log("server running")
})