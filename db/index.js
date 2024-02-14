import mongoose from "mongoose";

const connectDB = async (req,res) => {
    try {
        const connectionInstance = mongoose.connect(
            "mongodb://127.0.0.1:27017/recipe-blog"
        );
        console.log("MONGODB CONNECTED SUCCESSFULLY")
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED ",error)
    }
}

export default connectDB