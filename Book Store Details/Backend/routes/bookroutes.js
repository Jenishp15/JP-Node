const express = require("express")
const bookModel = require("../model/bookmodel")
const { bookDelete, bookAdd, bookShow, bookupdate} = require("../controller/bookcontroller")

const bookRoutes = express.Router()

bookRoutes.post("/add", bookAdd)

bookRoutes.delete("/delete", bookDelete)

bookRoutes.get("/",bookShow)

bookRoutes.put("/update/:id",bookupdate)

module.exports = bookRoutes
