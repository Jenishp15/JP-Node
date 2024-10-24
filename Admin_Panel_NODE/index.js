const express = require('express');
const fs = require('fs');
// const { logger } = require('./middlewares/logger'); // Corrected import for logger
// const { auth } = require('./middlewares/auth');     // Correct import for auth
const addID  = require('./middlewares/addID.middleware');   // Correct import for addID

const app = express();

// Middleware to add ID
// app.use('/add/hero', addID);

app.get("/heroes",(req,res)=>{
    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err){
            res.status(400).json({message:err.message})
        }else{
            res.status(200).json({message:"data fetch",data})
        }
    })
})

app.post("/add/hero",(req,res)=>{

    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err){
            res.send(err)
        }else{
            const newdata = JSON.parse(data)
            newdata.push(req.body)
            fs.writeFile("./db.json",JSON.stringify(newdata),(err)=>{
                if(err){
                    res.send(err)
                }else{
                    res.send("Data added successfully")
                }
            })
        }  
    })
})

app.patch("/update/villain/:hero_id",(req,res)=>{
    const id  = req.params.hero_id
    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err){
            res.send(err)
        }else{
            const productdata = JSON.parse(data);
            const index = productdata.findIndex((el)=> el.id == id)

            if(index != -1){
                productdata[index] = { ...productdata[index], ...req.body }

                fs.writeFile("./db.json", JSON.stringify(productdata), (err) => {
                    if(err){
                        res.send(err)
                    }else{
                        res.send("Data Edited ssuccessfully")
                    }
                })
            }else{
                res.send("Data not found")
            }
        } 
    });
})

app.delete("/delete/hero/:hero_id",(req,res)=>{
    
    const id = req.params.hero_id

    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err){
            res.status(400).json({message:err.message})
        }else{
            const productdata = JSON.parse(data)
            const filterdata = productdata.filter((el,index)=>el.id != id) 
            
            fs.writeFile("./db.json",JSON.stringify(filterdata),(err,data)=>{
                if(err){
                    res.status(400).json({message:err.message})
                }else{
                    res.status(200).json({message:"Data Deleted successfully"})
                }
            })
        }
    })
})

app.listen(8080,()=>{
    console.log("ssrver is running")
})