import Note from "../models/Note.js"
import mongoose from "mongoose";

// GET ALL NOTES
export async function getAllNotes(req, res) {
   try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
   } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
   }
}

// GET SINGLE NOTE BY ID
export async function getNotebyId(req, res) { // Changed "_" to "req" so we can access params
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid note ID format" });
        }

        const note = await Note.findById(id); // Fixed: Now actually finds by the unique ID
        if (!note)
            return res.status(404).json({ message: "Note not found" });
            
        res.json(note);
    } catch (error) {
        console.error("Error in getNotebyId controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// CREATE NEW NOTE
export async function createNotes(req, res) {
    try {
        const { title, content } = req.body;
        
        // Basic validation for fields
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const newNote = new Note({ title, content });
        await newNote.save();
        res.status(201).json({ message: "Note created successfully!", note: newNote });
    } catch (error) {
        console.error("Error in createNotes controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// UPDATE NOTE
export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid note ID format" });
        }

        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        if (!updatedNote)
            return res.status(404).json({ message: "Note not found" });
            
        res.status(200).json({ message: "Notes update successfully" });
    } catch (error) {
         console.error("Error in updateNotes controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// DELETE NOTE
export async function deleteNote(req, res) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid note ID format" });
        }

        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote)
            return res.status(404).json({ message: "Note not found" });
            
        res.status(200).json({ message: "Note deleted successfully!" });
    } catch (error) {
        console.error("Error in deleteNotes controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}