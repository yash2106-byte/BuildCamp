import mongoose, { Schema } from "mongoose"
import brcypt from "brcypt"

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


export const User = mongoose.model("User",userSchema)


