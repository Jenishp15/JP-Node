const signupform = document.getElementById("signup");

signupform.addEventListener(("submit"), (e) => {
    e.preventDefault();

    const signup_user_name = document.getElementById("signup_user_name").value
    const signup_Email = document.getElementById("signup_Email").value
    const date_birth = document.getElementById("date_birth").value
    const location = document.getElementById("location").value
    const signup_Password = document.getElementById("signup_Password").value
    const signup_Confirm_Password = document.getElementById("signup_Confirm_Password").value

    function checkuser() {
        if (signup_user_name == "") {
            document.getElementById("user_name_error").innerHTML = "Please enter Username";
            document.getElementById("signup_user_name").style.border = "1px solid red";
            document.getElementById("user_name_error").style.color = "red";
        }
        if (signup_Email == "") {
            document.getElementById("error_email").innerHTML = "Please enter Username";
            document.getElementById("signup_Email").style.border = "1px solid red";
            document.getElementById("error_email").style.color = "red";
        }
        if (date_birth == "") {
            document.getElementById("date_birth_error").innerHTML = "Please enter Username";
            document.getElementById("date_birth").style.border = "1px solid red";
            document.getElementById("date_birth_error").style.color = "red";
        }
        if (location == "") {
            document.getElementById("location_error").innerHTML = "Please enter Username";
            document.getElementById("location").style.border = "1px solid red";
            document.getElementById("location_error").style.color = "red";
        }
        if (signup_Password == "") {
            document.getElementById("error_password").innerHTML = "Please enter Username";
            document.getElementById("signup_Password").style.border = "1px solid red";
            document.getElementById("error_password").style.color = "red";
        }
        if (signup_Confirm_Password == "") {
            document.getElementById("signup_confirm_Password_error").innerHTML = "Please enter Username";
            document.getElementById("signup_Confirm_Password").style.border = "1px solid red";
            document.getElementById("signup_confirm_Password_error").style.color = "red";
        }if(signup_Password!=signup_Confirm_Password){
            alert("confirm password must be same")
        }
        else {
            return
        }
    }

    checkuser();

});

const signup_user_name = document.getElementById("signup_user_name")
const signup_Email = document.getElementById("signup_Email")
const date_birth = document.getElementById("date_birth")
const roll = document.getElementById("roll")
const loc = document.getElementById("location")
const signup_Password = document.getElementById("signup_Password")
const signup_Confirm_Password = document.getElementById("signup_Confirm_Password")
const signup_form = document.getElementById("signup")

signup_form.addEventListener(("submit"),(e)=>{
    e.preventDefault()

    let obj = {
        username: signup_user_name.value,
        email: signup_Email.value,
        DOB: date_birth.value,
        roll: roll.value,
        location: loc.value,
        password: signup_Password.value,
        confpassword: signup_Confirm_Password.value
    }

    fetch("http://localhost:8080/user/registration",{
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    })
    .then((res) => res.json())
    .then((data) => alert(data))
    .catch((err)=> console.log(err))

    signupform.reset();

})