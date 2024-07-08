import mongoose from "mongoose";

const connectDB= async()=>{
    try{
     const connectionInstance= await mongoose.connect(`${process.env.MONGO_URI}/CodoShrine`)
     console.log(`\n MongoDb Connected !! DB HOST: ${connectionInstance.connection.host}`)
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

export default connectDB;