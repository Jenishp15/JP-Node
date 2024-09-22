const productmodel = require("../model/productmodel")

const homeController = async (req, res) => {
    try {
        res.status(201).json({ message: "welcome to Home page" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const aboutController = async (req, res) => {
    try {
        res.status(201).json({ message: "welcome to About page" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const contactController = async (req, res) => {
    try {
        res.status(201).json({ message: "welcome to Contact page" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const formController = async (req, res) => {

    const { name, price, description, image } = req.body

    try {
        const singledata = Productmodel({ name, price, description, image })
        await singledata.save()

        res.status(200).json({ message: "data added successfully" })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = {homeController,aboutController,contactController,formController}