import mongoose, { Schema } from "mongoose"
import brcypt from "brcypt"
import jwt from "jsonwebtoken"
import cryto from "crypto"

const userSchema = new Schema({
    avatar:{
        types:{
            url:String,
            localPath: String,
        },
        default:{
            url: `https://placehold.co/600x400`,
            localPath: ""
        }
    },
    username:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true
    },
    fullname:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        required: [true,"password is required"]
    },
    isEmail:{
        type: Boolean,
        default: false
    },
    refershToken:{
        type: String
    },
    forgetPasswordToken:{
        type: String
    },
    forgetPasswordExpiry:{
        type: Date
    },
    emailVerficationToken:{
        type:String
    },
    emailVerficationExpiry:{
        type:Date
    },
    },
    {
        timestamps: true,
    },
);
// these are the hooks for the user schema 
userSchema.pre("save",async function(next){
    if (!this.isModified("password"))
        return next()
    this.password = await brcypt.hash(this.password,10)
    next()
})
userSchema.method.isPasswordCorrect = async function (password) {
    return await brcypt.compare(password,this.password)    
};

// we are generating Access tokens below ,for every user request this function we be called
userSchema.method.GenerateAcces = function(){
    // this will be the payload which will be returned 
    return jwt.sign({
        _id: this._id,
        email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    )
}
// THIS IS GENREATING THE REFRESH TOKEN
userSchema.method.GenerateRefresh = function(){
    // this will be the payload which will be returned 
    return jwt.sign({
        _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    )
}
// genrating a hashed string  
userSchema.method.GenerateTemp = function(){
    const unhashed = cryto.randomBytes(20).toString("hex")
    const hashed = cryto.createHash("sha256").update(unhashed).digest("hex")
    const tokenExpiry = Date.now() + (20*60*100)
    return {unhashed,hashed,tokenExpiry}
}

export const User = mongoose.model("User",userSchema)


 