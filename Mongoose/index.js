const mongoose = require('mongoose')

const main = () => {

    mongoose.connect('mongodb://127.0.0.1:27017/home').then((res)=>{
        console.log(res)
        console.log("connected to DB")
    }).catch((err)=>{
        console.log(err)
    })
}

main()