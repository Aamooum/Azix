import mongoose from "mongoose";



export async function dbConnect(){

    try {
        const conn = await mongoose.connect(String(process.env.MONGO_DB_CONNECTION_STRING))
        return conn
    } catch (err) {
        console.log("err in db",err)
    }
} 
/*
mongodb://localhost:27017/ecomerce
c8Imu0fBp8Oi39dh*/