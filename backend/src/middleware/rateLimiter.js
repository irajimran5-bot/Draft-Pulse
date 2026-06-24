import ratelimit from "../config/upstash.js";

const rateLimiter=async(req,res,next)=>{
    try{
        const identifier = req.ip || "global"; 
        console.log(`🔍 Checking rate limit for IP: ${identifier}`);
        const result = await ratelimit.limit(`rate_limit_${identifier}`);
        console.log("📊 Upstash Result:", {
            success: result.success,
            limit: result.limit,
            remaining: result.remaining,
            reset: result.reset
        });
        if(!result.success){
            return res.status(429).json({message:"Too many requests,please try again later"});
        }
        next();
    }catch(error){
        console.log("Rate limit error",error);
        next();

    }

}
export default rateLimiter;