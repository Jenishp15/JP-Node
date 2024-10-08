const express = require("express")
const { notesCreate, notesDelete, notesUpdate, getNotes, allnoteDelete, allnoteGet } = require("../controller/note.controller")
const AuthMiddleware = require("../middleware/Auth")
const rollValidator = require("../middleware/rollValidator")

const NoteRouter = express.Router()

NoteRouter.use(AuthMiddleware)
NoteRouter.post("/create",notesCreate)
NoteRouter.patch("/update/:noteId",notesUpdate)
NoteRouter.delete("/delete/:noteId",notesDelete)
NoteRouter.get("/getdata",getNotes)

NoteRouter.use(rollValidator)
NoteRouter.delete("/allnotedelete",allnoteDelete)
NoteRouter.get("/allnoteget",allnoteGet)

module.exports=NoteRouter