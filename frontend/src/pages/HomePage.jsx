import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import NoteCard from '../components/NoteCard' 
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
        const res = await axios.get("http://localhost:5001/api/notes");
        
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
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Your Dashboard</h2>
           
            {notes.length === 0 && !isRateLimited && <p>No notes found. Create one!</p>}

            {/* ✨ Fixed Grid and Single Loop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {notes.map((singleNote) => (
                <NoteCard key={singleNote._id} note={singleNote} />
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;