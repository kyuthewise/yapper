import mongoose from "mongoose";


export const connectMongoDB = async () =>{
    try{
        
        if(process.env.MONGODB_URL)
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('connected mongodb')
    }
    catch(error){
        console.log('err connect mongodb', error)
    }
}