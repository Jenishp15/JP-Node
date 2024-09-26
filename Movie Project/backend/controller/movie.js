// const express = require("express")
const MovieModel = require("../model/movieModel.js")
const jwt = require("jsonwebtoken")
const env = require("dotenv")
const UserModel = require("../model/userModel.js")
env.config()

const GetMovie = async(req,res)=>{

    try {
        const getmovie = await MovieModel.find()
        res.status(200).json({message:getmovie})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const PostMovie = async(req,res)=>{
    const {title,genre,director,releaseYear,description} = req.body

    const token = req.cookies?.accesstoken;
    const {email} = jwt.verify(token,process.env.PRIVATEKEY)
    const user = UserModel.findOne({email})
    
    
    try {
        const singlemovie = MovieModel({title,genre,director,releaseYear,description,userId:req.user.id})
        await singlemovie.save()
        res.status(200).json({message:"movie added successfully"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const PutMovie = async(req,res)=>{
    const {movieId} = req.params
    const userid = req.user.id

    try {

        const data = await MovieModel.findOne({userId:userid});

        if(!data){
            return res.status(400).json({message:"Please login"}) 
        }

        await MovieModel.findByIdAndUpdate({_id: movieId},req.body)
        res.status(200).json({message:"movie updated"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const DeleteMovie = async(req,res)=>{
    const id = req.params.id    
    const userid = req.user.id
    try {

        const data = await MovieModel.findOne({userId:userid});
        console.log(data)

        if(!data){
            return res.status(400).json({message:"Please login"}) 
        }

        await MovieModel.findByIdAndDelete(id)  
        res.status(200).json({message:"data deleted"})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }
}

module.exports={GetMovie,PostMovie,PutMovie,DeleteMovie}