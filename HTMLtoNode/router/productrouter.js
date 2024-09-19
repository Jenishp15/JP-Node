const express = require("express")
const Productmodel = require("../model/productmodel")

const ProductRouter = express.Router()

ProductRouter.get("/", async (req, res) => {
    try {
        
        res.status(201).json({ message: "welcome to Home page" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

ProductRouter.get("/about", async (req, res) => {
    try {
        res.status(201).json({ message: "welcome to About page" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

ProductRouter.get("/contact", async (req, res) => {
    try {
        res.status(201).json({ message: "welcome to Contact page" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

ProductRouter.post("/contact", async (req, res) => {

    const { name, price, description, image } = req.body

    try {
        const singledata = Productmodel({ name, price, description, image })
        await singledata.save()

        res.status(200).json({ message: "data added successfully" })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})


module.exports = ProductRouter