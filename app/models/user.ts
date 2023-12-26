import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
    },
    password: {
        type: String, 
        required: false
    },
    image: {
        type: String,
        required: false,
        default: '/uploads/defaultimg.svg'
    },
    info: {
    Job: {
        type: String,
        required: false
    },
    Hobbies: {
        type: String,
        required: false
    }, 
    Education: {
    type: String,
    required: false
    },
    Location: {
        type: String,
        required: false
    },
    Aboutme:{
        type: String,   
        required: false
    }
    },
    friends: [String]
    
}, {timestamps: true})

const User = models.User || mongoose.model("User", userSchema);

export default User;