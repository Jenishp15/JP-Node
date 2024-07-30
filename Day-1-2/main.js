// DAY 1 =>

// const {sum,sub} = require("./index")

// console.log(sum(2,5))
// console.log(sub(5,2))

// DAY 2 =>

// const fs = require("fs")

// fs.readFile("./lecture.txt","utf8", (err,data)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data);
//     }
// })

// ===========>

// const { Console } = require("console")
// const fs = require("fs")

// console.log("1");

// const data = fs.readFileSync("./lecture.txt","utf8")
// console.log(data)

// console.log("2");

// ===========>

const fs = require("fs")

// fs.writeFile("lecture.txt","Hyy\n ",(err)=>{            // IT'S OVERWRITE THE FILE
//     console.log(err)
// })

fs.appendFile("lecture.txt","Hello\n ",(err)=>{            // IT'S OVERWRITE THE FILE
    console.log(err)
})

