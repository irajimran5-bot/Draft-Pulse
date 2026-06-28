import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import NoteCard from '../components/NoteCard' ;
import NotesNotFound from '../components/NotesNotFound';
import api from '../lib/axios';
import axios from "axios";
import toast from "react-hot-toast";

const RateLimitedUI = () => {
  return (
    <div className="mx-auto max-w-6xl p-4 mt-4">
      <div className="alert alert-warning shadow-lg">
        <div>
          <span>⚠️ Too many requests! Please slow down a bit.</span>
        </div>
      </div>
    </div>
  );
};
 
const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

 useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setIsRateLimited(false); 
        
        // FIX: Added the correct /api prefix here
        const res = await api.get("/api/notes");
        
        setNotes(res.data);
        console.log(res.data);
        
      } catch (error) {
        console.log("Error fetching notes");
        
        if (error.response && error.response.status === 429) { 
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotes();
  }, []);

  return (
    <div className='min-h-screen bg-base-100 text-base-content'>
      <Navbar />
      
      {isRateLimited && <RateLimitedUI />}

      <div className='mx-auto max-w-6xl p-4'>
        {loading ? (
          <span className="loading loading-spinner loading-lg text-primary block mx-auto mt-10"></span>
        ) : (
          <div className="mt-4 w-full" >
            <h2 className="text-xl font-bold mb-2">Your Dashboard</h2>
           {notes.length===0&&!isRateLimited&&<NotesNotFound/>}
            {notes.length === 0 && !isRateLimited }

            {}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 w-full items-start">
              {notes.map((singleNote) => (
                <NoteCard key={singleNote._id} note={singleNote} setNotes={setNotes}/>
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;