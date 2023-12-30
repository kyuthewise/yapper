import mongoose, { Schema, models } from "mongoose";

const postSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: false
    },
    likedBy:[
        {
            type: String
        }
    ],
    likes: {
        type: Number, 
        default: 0
    },
    comments: [
        {
            user: String,
            text: String,
            image: String
        }
    ]

}, {timestamps: true})

const Post = models.Post || mongoose.model("Post", postSchema)
export default Post;