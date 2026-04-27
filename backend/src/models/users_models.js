import mongoose, { Schema } from "mongoose"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import crypto from "crypto"  

const userSchema = new Schema({
    avatar:{
        url:{                                           
            type: String,
            default: "https://placehold.co/600x400"
        },
        localPath:{
            type: String,
            default: ""
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

userSchema.pre("save", async function(){
    if (!this.isModified("password"))
        return
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = async function(password){  
    return await bcrypt.compare(password, this.password)    
};

userSchema.methods.GenerateAcces = function(){                     
    return jwt.sign({
        _id: this._id,
        email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    )
}

userSchema.methods.GenerateRefresh = function(){                  
    return jwt.sign({
        _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    )
}

userSchema.methods.GenerateTemp = function(){                      
    const unhashed = crypto.randomBytes(20).toString("hex")        
    const hashed = crypto.createHash("sha256").update(unhashed).digest("hex")
    const tokenExpiry = Date.now() + (20*60*1000)
    return {unhashed, hashed, tokenExpiry}
}

export const User = mongoose.model("User", userSchema)