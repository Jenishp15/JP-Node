const http = require("http")
const fs = require("fs")

const server = http.createServer((req,res)=>{
    if (req.url == "/" || req.url == "/home") {
        res.end("Welcome to Home Page")
    } else if (req.url == "/about") {
        res.end("Welcome to About Page")
    } else if (req.url == "/addproductdata" && req.method=="POST") {

        let str=""
        req.on("data",(chunk)=>{
            str+=chunk
        })
        req.on("close",()=>{
            console.log(str)
            res.end()
        })
        fs.readFile("./db.json","utf8",(err,data)=>{
            if(err){
                res.end(err)
            }else{
                const getdatafromdb = JSON.parse(data)
                getdatafromdb.products.push(JSON.parse (str))
                fs.writeFile("./db.json",JSON.stringify(getdatafromdb),(err)=>{
                    if(err){
                        res.end(err)
                    }else{
                        res.end("product added")
                    }
                })
                res.end()
            }
        })
    }else{
        res.end("not found") 
    }
})

server.listen(8080,()=>{
    console.log("server running");
})