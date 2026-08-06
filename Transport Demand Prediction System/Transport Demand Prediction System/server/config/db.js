// import mongoose from "mongoose";

// export const connectDB = async () => {
//   await mongoose.connect("mongodb+srv://harinisubramanian06_db_user:gGgUCXILMoAViLJz@cluster0.mpwz9nj.mongodb.net/RIDE");
//   console.log("MongoDB Connected");
// };

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://harinisubramanian06_db_user:gGgUCXILMoAViLJz@cluster0.mpwz9nj.mongodb.net/RIDE");
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};