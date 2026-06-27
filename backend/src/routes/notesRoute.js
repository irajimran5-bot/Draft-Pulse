import express from "express"
import { createNotes, deleteNote, getAllNotes, updateNote,getNotebyId } from "../controllers/notesController.js";

const router=express.Router();
router.get("/:id",getAllNotes);
router.post("/",createNotes);
router.get("/:id", getNotebyId);
router.put("/:id",updateNote);
router.delete("/:id",deleteNote);

export default router;
