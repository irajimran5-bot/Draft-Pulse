import Note from "../models/Note.js"
import mongoose from "mongoose";
export async function getAllNotes(req,res){
   try{
    const notes=await Note.find().sort({createdAt:-1});
    res.status(200).json(notes)
   }catch(error){
    console.error("Error in getAllNotes controller",error);
    res.status(500).json({message:"Internal server error"});
   }
}
export async function getNotebyId(_,res){
    try{
        const note=await Note.find().sort({createAt:-1});//-1 will sort in descending order_newest first 
        if(!note)
            return res.status(404).json({message:"Note not found"})
        res.json(note);
    }catch(error){
        console.error("Error in getNotebyId controller",error);
        res.status(500).json({message:"Internal server error"});
           
    }
}
export async function createNotes(req,res){
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid note ID format" });
    }
    try{
        const{title,content}=req.body
        const newNote=new Note({title,content})
        await newNote.save()
        res.status(201).json({message:"Note created successfully!"})
    }catch(error){
        console.error("Error in createNotes controller",error);
        res.status(500).json({message:"Internal server error"});
   
    }
}
export async function updateNote(req,res){
    try{
        const{title,content}=req.body
        const updatedNote=await Note.findByIdAndUpdate(req.params.id,{title,content});
        if(!updatedNote)
            return res.status(404).json({message:"Note not found"});
        res.status(200).json({message:"Notes update successfully"});
    }catch(error){
         console.error("Error in updateNotes controller",error);
        res.status(500).json({message:"Internal server error"});
   
    }
}
export async function deleteNote(req,res){
    try{
        const deletedNote=await Note.findByIdAndDelete(req.params.id)
        if(!deletedNote)
            return res.status(404).json({message:"Note not found"});
    res.status(200).json({message:"Note deleted successfully!"})
    }catch(error){
        console.error("Error in deleteNotes controller",error);
        res.status(500).json({message:"Internal server error"});
   
    }
}