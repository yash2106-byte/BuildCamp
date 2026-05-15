import {User} from "../models/users_models.js"
import {ApiResponse} from "../utils/api-response.js"
import {asyncHandler} from "../utils/async-handler.js"
import {ApiError} from "../utils/api-error.js"
import { emailVerificationMailgenContent, sendEmail } from "../utils/mail.js"

// the first thing we'll need is token, hence we are genrating it first
// make sure that the name of the tokens are same everywhere even extra spaces cause error
const GenerateAllTokens = async (userId) =>{
    try {
        const Newuser = await User.findById(userId)
        const accessToken = Newuser.GenerateAcces();
        const refreshToken = Newuser.GenerateRefresh()

        Newuser.refershToken = refreshToken
        await Newuser.save({ validateBeforeSave: false })

        return { accessToken, refreshToken } 

    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating tokens")
    }
} 


const RegisterUser = asyncHandler(async (req,res)=>{
    const {email,username,password,role} = req.body
    // Check database for this user
    // check email and username separtely because that is generating confusion
    const existedUser =await User.findOne({
        $or: [{username},{email}]
    })
    if(existedUser){
        throw new ApiError(402,"User with the same email already exists")
    }
    const existedUsername = await User.findOne({
        $or: [{username}]
    })
    if (existedUsername){
        throw new ApiError(402,"User with the same username already exists")
    }

    // Create new user in the database
    const Newuser = await User.create({
        email,
        password,
        username,
        isEmailVerified: false
    })
    const{unhashed,hashed,tokenExpiry} = Newuser.GenerateTemp()
    Newuser.emailVerficationToken = hashed
    Newuser.emailVerficationExpiry = tokenExpiry
    await Newuser.save({validateBeforeSave: false})


    // After creating the user then we'll send the email for validation
    await sendEmail({
        email:Newuser?.email,
        subject: "Plese verfiy your email",
        mailgenContent: emailVerificationMailgenContent(
            Newuser.username,
            // this is the link which will be passed 
            `${req.protocol}://${req.get("host")}//api/v1/users/verify-email/${unhashed}`
        )
    })

    // Checking if the user has been created or not
    const createdUser = await User
        .findById(Newuser._id)
        .select("-password -refershToken -emailVerficationToken -emailVerficationExpiry")
    if (!createdUser){
        throw new ApiError(500 , "Something went wrong while registering user")
    }

    // if everyhting has worked fine the user is created 
    return res
        .status(200)
        .json(
            new ApiResponse(200,
                {user:createdUser},
                "User has been created succesfully and verfication mail has been sent to your email id"
            ))
})

// We'll be adding the login controller here only rather then having a different fie

// Login function is performed in levels
const loginfunction = asyncHandler(async(req,res)=>{

    // take data from user
    const {email,password} = req.body
    // console.log(email);
    if (!email){
        
        
        // return res.status(400).json({Error:"Gmail is not available"})
        throw new ApiError(400,"Gmail has not reached the server") // this is how we should use the ApiError function
    }

    // Validate if the details is correct or not 
    const user = await User.findOne({email})
    if (!user){
        throw new ApiError(400,"The gmail given is not registered")
    }

    // Check if the password is valid or not
    const isPasswordvalid = await user.isPasswordCorrect(password)
    if (!isPasswordvalid){
        throw new ApiError(400,"Password is incorrect")
    }

    // Generate Tokens
    const { accessToken,refreshToken  }= await GenerateAllTokens(user._id)

    // Tell database that the user has logged in
    const loggedUser = await User
        .findById(user._id)
        .select("-password -refershToken -emailVerficationToken -emailVerficationExpiry")
    if (!loggedUser){
        throw new ApiError(500 , "Something went wrong while registering user")
    }

    // Send tokens in the cookies
    const option = {
        httpOnly:true,
        secure:true
    }
    return res
        .status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken , option) 
        .json(
            new ApiResponse(200,
                { user: loggedUser, accessToken, refreshToken },
                "User logged in successfully"
            )
        )

})

// for the logout logic we'll first get the refresh token from our database
const logoutUser = asyncHandler(async(req,res)=>{
   await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refershToken: ""
            }
        },
        {
            new: true
        }
    );
    const options = {
        httpOnly:true,
        secure:true
    }
    return res 
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refershToken", options)
        .json(new ApiResponse(200,{},"user Logged out"));
})

export {RegisterUser,loginfunction,logoutUser}
