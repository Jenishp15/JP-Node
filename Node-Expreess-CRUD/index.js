const express = require('express');
const app = express();

const fs = require("fs");
const { send } = require('process');

app.use(express.json())
  

app.get("/home",(req,res)=>{
    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
        
    })
})

app.post("/addproduct",(req,res)=>{

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

app.patch("/editproduct/:id",(req,res)=>{
    const { id } = req.params;
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

app.put("/updateproduct/:id",(req,res)=>{
    const id = req.params.id
   
    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err){
            res.send(err);
        }else{
            const productdata = JSON.parse(data);
            const index = productdata.findIndex((el)=> el.id == id);

            if(index != -1){
                
                productdata[index] = {id, ...req.body};

                    fs.writeFile("./db.json",JSON.stringify(productdata),(err)=>{
                        if(err){
                            res.send(err)
                        }else{
                            res.send("Data updated")
                        }
                    })

            }else{
                res.send("data not found")
            }
        }
    })
})

app.delete("/deleteProduct/:id",(req,res)=>{
    
    const id = req.params.id

    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err){
            res.send(err)
        }else{
            const productdata = JSON.parse(data)
            const filterdata = productdata.filter((el,index)=>el.id != id) 
            
            fs.writeFile("./db.json",JSON.stringify(filterdata),(err,data)=>{
                if(err){
                    res.send(err)
                }else{
                    res.send("Data Deleted successfully")
                }
            })
        }
    })

})

app.listen(8080,()=>{
    console.log("server is running")
})