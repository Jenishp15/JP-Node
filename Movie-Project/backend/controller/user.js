const express = require("express")
const UserModel = require("../model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserRegister = async (req, res) => {
    const { username, email, password, role } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                console.log("error to genriting hash password")
            }
            const singleuser = UserModel({ username, email, password: hash, role })
            await singleuser.save()

            var verificationToken = jwt.sign({ username, email, password, role }, process.env.PRIVATEKEY)
            res.cookie("verificationToken", verificationToken).json({ message: "User created successfully" })
        })
    } catch (error) {
        res.status(400).json({ message: error.mressage })
    }
}

const UserLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        } else {
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    const accesstoken = jwt.sign({ email }, process.env.PRIVATEKEY)
                    res.cookie("accesstoken", accesstoken).json({ message: "Login successfully" })
                }else{
                    res.status(400).json({ message: "Invalid password" })

                }
            })
        }
}

module.exports = {UserRegister, UserLogin}