const express = require("express")
const AuthMiddleware = require("../middleware/Auth")
const rollValidator = require("../middleware/rollValidator")
const { BlogCreate, BlogUpdate, BlogDelete, GetBlogs, AllBlogGet, AdminBlogUpdate, blogdeletebyAdmin } = require("../controller/blog.controller")

const BlogRouter = express.Router()

BlogRouter.use(AuthMiddleware)
BlogRouter.post("/create",BlogCreate)
BlogRouter.put("/update/:blogId",BlogUpdate)
BlogRouter.delete("/delete/:blogId",BlogDelete)
BlogRouter.get("/getdata",GetBlogs)
BlogRouter.get("/allBlogget",AllBlogGet)

BlogRouter.use(rollValidator)
BlogRouter.delete("/blogdeletebyAdmin/:blogId",blogdeletebyAdmin)
BlogRouter.put("/adminupdate/:blogId",AdminBlogUpdate)


module.exports=BlogRouter