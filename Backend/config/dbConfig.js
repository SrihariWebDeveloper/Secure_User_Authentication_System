import mongoose from 'mongoose'

const coonectDb = async()=>{

    mongoose.connection.on("connected",()=>console.log("DB connected"));

    await mongoose.connect(`${process.env.MONGOODB_URL}/auth`)
}

export default coonectDb;