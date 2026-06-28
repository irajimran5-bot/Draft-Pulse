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
  const [notes, setNotes] = useState([]); // Initialized as array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setIsRateLimited(false); 
        
        const res = await api.get("/api/notes");
        
        // Ensure we only set state if the incoming payload is a valid array
        if (Array.isArray(res.data)) {
          setNotes(res.data);
        } else {
          console.error("Backend did not return an array:", res.data);
          setNotes([]); // Fallback safety
        }
        
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

  // Compute safely
  const hasNoNotes = Array.isArray(notes) ? notes.length === 0 : true;

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
            
            {hasNoNotes && !isRateLimited && <NotesNotFound />}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 w-full items-start">
              {(Array.isArray(notes) ? notes : []).map((singleNote) => (
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