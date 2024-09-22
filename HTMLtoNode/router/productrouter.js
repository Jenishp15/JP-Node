const express = require("express")
const {homeController, aboutController, contactController, formController ,  } = require("../controller/product")

const ProductRouter = express.Router()

ProductRouter.get("/",homeController)

ProductRouter.get("/about", aboutController)

ProductRouter.get("/contact", contactController)

ProductRouter.post("/contact", formController)

module.exports = ProductRouter