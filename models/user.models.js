import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        avatar:{
            type:String,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        role:{
            type:String,
            enum:["USER","ADMIN"],
            default:"USER"
        },
        refreshToken:{
            type:String
        }
    },
    {
    timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next();
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        fullName:this.fullName
    },
    process.env.ACCESS_TOKEN,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this._id,
    },
    process.env.REFRESH_TOKEN,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    })
}

const User = mongoose.model("User",userSchema)

export default User
