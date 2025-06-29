import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config"

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary url
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

//!hook
//-> pre hook atle k data save thay ee pela call back function execute karvu , normal function usr karvu kem k ()=> ma this no access hoto nathi..

//?jo password modified thyo hot to j bcrypt karvano alse ny karavno

userSchema.pre("save", async function (next) {

  if (this.isModified("password")) {
    this.password =await bcrypt.hash(this.password, 10);
  } else {
    next();
  }
});

//*check password is bot are equal or not..

userSchema.methods.isPasswordCorrect=async function (password){
 return await bcrypt.compare(password,this.password)//true or false in result..
}

userSchema.methods.generateAccessToken=function(){
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
}

//long term  {10d}
userSchema.methods.generateRefreshToken = function (){
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);

// console.log(process.env.ACCESS_TOKEN_EXPIRY);