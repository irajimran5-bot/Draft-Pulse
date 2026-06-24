import mongoose from "mongoose";
import dns from "dns";

// Force Node.js to use Google's DNS resolver to bypass local networks
dns.setServers(["8.8.8.8", "8.8.4.4"]);

export const connectDB = async () => {
    try {
        const dbURI = process.env.MONGO_URI;
        
        if (!dbURI) {
            throw new Error("MONGO_URI is undefined. Check your environment setup.");
        }

        await mongoose.connect(dbURI, {
            serverSelectionTimeoutMS: 5001,
        });
        
        console.log("MONGODB connected successfully via secure env! 🔌✨");
    } catch (error) {
        console.error("Error connecting to MONGODB:", error.message);
    }
}
 //Vu044SSAmYGOlV97