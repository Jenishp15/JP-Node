const express = require("express")
const contactController = require("../controller/contact")

const ConatctRouter = express.Router()

ConatctRouter.post("/",contactController)

module.exports=ConatctRouter
