const express = require("express")
const { bookDelete, bookAdd, bookShow, bookupdate} = require("../controller/bookcontroller")

const bookRoutes = express.Router()

bookRoutes.get("/",bookShow)

bookRoutes.post("/add", bookAdd)

bookRoutes.put("/update/:id",bookupdate)

bookRoutes.delete("/delete/:id", bookDelete)

module.exports = bookRoutes
