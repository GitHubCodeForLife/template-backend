import mongoose from "mongoose";

const { connect } = mongoose;

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URL);
    console.log("DBConnection Successful");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
