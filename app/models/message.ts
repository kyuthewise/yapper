import mongoose, { Schema, models } from "mongoose";

const messageSchema = new Schema({
    userid: {
        type: String,
        required: true
        },
    message: {
        type: String,
        required: true
    },
    recieverId: {
        type: String,
        required: true
    }

}, {timestamps: true})

const Message = models.Message || mongoose.model("Message", messageSchema)
export default Message;