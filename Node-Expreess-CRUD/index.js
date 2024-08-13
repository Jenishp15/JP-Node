const express = require('express');
const app = express();

const fs = require("fs")

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
            res.send(err);
        }else{
            const productdata = JSON.parse(data);
            const index = productdata.findIndex((el)=> el.id == id);

            if(index != -1){
                productdata[index] = { ...productdata[index], ...req.body };

                fs.writeFile("./db.json", JSON.stringify(productdata), (err) => {
                    if(err){
                        res.send(err);
                    }else{
                        res.send("Data Edited ssuccessfully");
                    }
                });
            }else{
                res.send("Data not found")
            }
        } 
    });
});

app.put("/updateproduct/:id",(req,res)=>{
    const id = req.params.id
    const title = req.body.title
    const price = req.body.price
    const description = req.body.description
    const category = req.body.category
    const image = req.body.image

    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err){
            res.send(err);
        }else{
            const productdata = JSON.parse(data);
            const index = productdata.findIndex((el)=> el.id == id);

            if(index != -1){
                
                productdata[index] = { ...productdata[index], ...req.body };

                    // let pdata = productdata[index]
                    // pdata.title = title
                    // pdata.price = price
                    // pdata.description = description
                    // pdata.category = category
                    // pdata.image = image
                    // res.json(pdata)

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

app.listen(8080,()=>{
    console.log("server is running")
})