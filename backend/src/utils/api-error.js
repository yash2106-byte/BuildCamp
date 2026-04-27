// this is the basic template which will be used when we get an error
// these files helps us to predict what things will be recived if we get an error
class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack=""        
    )
    {
        super(message)
        this.statusCode= statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if (stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}


export {ApiError};