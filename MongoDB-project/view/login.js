const loginForm = document.getElementById("login");

loginForm.addEventListener(("submit"), (e) => {
    e.preventDefault();

    const login_username = document.getElementById("login-username").value
    const login_password = document.getElementById("login-password").value

    function checkuser() {
        if (login_username == "") {
            document.getElementById("logininUserError").innerHTML = "Please enter Username";
            document.getElementById("login-username").style.border = "1px solid red";
            document.getElementById("logininUserError").style.color = "red";
        }
        if (login_password == "") {
            document.getElementById("PasswordError").innerHTML = "Please enter password";
            document.getElementById("login-password").style.border = "1px solid red";
            document.getElementById("PasswordError").style.color = "red";
        }
        else {
            document.getElementById("logininUserError").innerHTML = "";
            document.getElementById("login-username").style.border = "";

            document.getElementById("PasswordError").innerHTML = "";
            document.getElementById("login-password").style.border = "";
            return
        }
    }

    checkuser();

});

const login_username = document.getElementById("login-username")
const login_password = document.getElementById("login-password")
const loginform = document.getElementById("login")

loginForm.addEventListener(("submit"),(e)=>{
    e.preventDefault()

    let obj = {
        username:login_username.value,
        password:login_password.value
    }



    fetch("http://localhost:8080/user/login",{
        method:"POST",
        headers:{
            'Content-Type': 'application/json',  
        },
        body: JSON.stringify(obj)
    })
    .then((res) => res.json())
    .then((data) => alert(data))
    .catch((err)=> console.log(err))

    loginForm.reset();
})


