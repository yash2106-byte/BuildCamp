import {User} from "../models/users_models.js"
import {ApiResponse} from "../utils/api-response.js"
import {asyncHandler} from "../utils/async-handler.js"
import {ApiError} from "../utils/api-error.js"
import {emailVerficationMailgenContent, sendEmail} from "../utils/mail.js"

// the first thing we'll need is token, hence we are genrating it first
const GenerateAllTokens = async (userId) =>{
    try {
        const Newuser = await User.findById(userId)
        const AccessToken = Newuser.GenerateAcces();
        const RefreshToken = Newuser.GenerateRefresh()

        Newuser.refershToken = RefreshToken
        await Newuser.save({validateBeforeSave: false})
        return {AccessToken,RefreshToken}

    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating tokens")
    }
} 


const RegisterUser = asyncHandler(async (req,res)=>{
    const {email,username,password,role} = req.body
    // Check database for this user
    const existedUser =await User.findOne({
        $or: [{username},{email}]
    })
    if(existedUser){
        throw new ApiError(402,"User with the same email or username already exists")
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
        mailgenContent: emailVerficationMailgenContent(
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


export {RegisterUser}
