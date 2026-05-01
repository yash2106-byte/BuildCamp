// this helps you to validate user input this works as a middleware
import { validationResult } from 'express-validator'
import { ApiError } from "../utils/api-error.js"


// we'll be using this validationResult in the other part but for now we are just giveing it a req which will be checked by this function and is there is an Error then it will be given out using our error functions
export const validate = (req,res,next)=>{
    const error = validationResult(req)
    if(error.isEmpty()){
        return next()
    }
    // if there are some errors then we are converting it into an array so that we can loop through it once we have made the array then we'll push with error path and error message in a pair
    const extractedError = []
    error.array().map((err)=> extractedError.push(
        {
            [err.path]:err.msg
        }));
        throw new ApiError(422,"Recived data is not valid",extractedError)
}