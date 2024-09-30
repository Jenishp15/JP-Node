const express = require("express")
const { GetMovie, PostMovie, PutMovie, DeleteMovie } = require("../controller/movie")
const AuthMiddleware = require("../middleware/auth")

const MovieRouter = express.Router();

MovieRouter.use(AuthMiddleware)

MovieRouter.get("/",GetMovie)

MovieRouter.post("/add",PostMovie)

MovieRouter.put("/update/:movieId",PutMovie)

MovieRouter.delete("/delete/:id",DeleteMovie)


module.exports=MovieRouter
