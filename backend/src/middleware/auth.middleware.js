// Everytime i had to verify the acces token for the user so instead of writting it again again in the controllers i have put it in the middleware only
// In this middleware I will try to extract some of the information from the access token and then using that I'll append a function

import { User } from "../models/users_models.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";


export const verifyJWT = asyncHandler(async(req,res,next)=>{
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

    if (!token){
        throw new ApiError(401,"Unauthorized request while catching token in the middleware")
    }

    try{
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refershToken -emailVerficationToken -emailVerficationExpiry")

        if (!user){
            throw new ApiError(401,"Invalid token")
        }
        req.user = user
        next()
    }
    catch(error){
        throw new ApiError(401,"Invalid Acces token")
    }
})