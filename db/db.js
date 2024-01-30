import mongoose from "mongoose";
export const connectDB = async () => {
    try {
      const conn = await mongoose.connect(`mongodb+srv://paswanaditya256:58H7wOLug3sl74Ym@cluster0.ug1ac3n.mongodb.net/?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }