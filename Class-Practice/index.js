// Read the db.json and console it

// const data = require("./db.json")

// console.log(data)

const fs = require("fs")

fs.readFile("./db.json","utf8",(err,data)=>{
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
})
