const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    profileImage: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    },
    role: {
        type: String,
        default: "user"
    }
},{
    timestamps:true,
    versionKey:false
})

const UserModel = mongoose.model("user",UserSchema)

module.exports = UserModel