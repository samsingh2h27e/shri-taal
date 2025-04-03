import mongoose from "mongoose";

export const connectDB = async () => {
    const uri = "mongodb://localhost:27017/"; // Replace 'testdb' with your database name
  
  mongodb: try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};
  