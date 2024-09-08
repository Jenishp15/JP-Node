const main_content = document.getElementById("main-content")

let finaldata = []

fetch("http://localhost:8080/user/getdata")
    .then((res) => res.json())
    .then((data) => {
        finaldata = data
        console.log(finaldata.map(el => el.username))
    })
    .then((err) => console.log(err))

    
    
// function cardList(data) {
    
//     console.log()
    
    // let store = data.map((el) => card(el._id,el.username,el.email,el.Dob,el.roll))

    // main_content.innerHTML = store.join("")
// }

// function card(_id,username ,email ,Dob , roll ) {
//     return `
//     <div class="col-3 UserCard" data-id="${id}">
//         <p>Name : ${username}</p>
//         <p> E-mail : ${email}</p>
//         <p>DOB : ${Dob}</p>
//         <p>Roll : ${roll}</p>
//         <button  data-id="${id}">Update</button>
//         <button  data-id="${id}">Dlete</button>
//     </div>`
// }