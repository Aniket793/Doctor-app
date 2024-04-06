const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.DB_URL)
        console.log("MongoDB connected successfully")
    } catch{
        console.log("databse connection failed");
    }
}



module.exports = connectDB; 