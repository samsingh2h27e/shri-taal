import mongoose from "mongoose";
import env from "dotenv";
export const connectDB = async () => {
    const uri = process.env.URI;
  
  mongodb: try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // console.log("Connected to MongoDB successfully");
  } catch (error) {
    // console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};
  