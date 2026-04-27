import {ApiResponse} from "../utils/api-response.js"
import {asyncHandler} from "../utils/async-handler.js"

/** 
  this  was the main logic but because using try catch is not reliable we have defined a function in utils which we are using here
const healthcheck = async (req,res,next)=>{
    try {
        const user = await getUserFromDB()

        res.status(200).json(
            new ApiResponse(200,{message: "Server is running"})
        )
    } catch (error) {}
    next(err)
    console.log(err)
}
*/



const healthcheck = asyncHandler(async(req,res)=>{
    res.status(200).json(
        new ApiResponse(200,{message:"Server is running"})
    )
})
export {healthcheck}