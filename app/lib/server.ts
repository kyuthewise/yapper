import mongoose from "mongoose";
import Create from 'next-connect';

export const connectMongoDB = async () =>{
    try{
        if(process.env.MONGODB_URL)
        await mongoose.connect('mongodb+srv://kyujook:redert77@cluster0.kzjq4e6.mongodb.net/?retryWrites=true&w=majority')
        console.log('connected mongodb')
    }
    catch(error){
        console.log('err connect mongodb', error)
    }
}