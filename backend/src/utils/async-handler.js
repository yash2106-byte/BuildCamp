// this is a high level function because i am taking a fucntion as a parameter and returning a function 

const asyncHandler = (requestHandler) => {
    return (req,res,next) => {
        Promise
        .resolve(requestHandler(req,res,next))
        .catch((err) => next(err))
    }
}

export {asyncHandler}