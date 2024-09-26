const Productmodel = require("../model/productmodel")
const ejs = require("ejs")

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

module.exports = formController