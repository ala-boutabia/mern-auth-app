import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

//Connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

// Routes
app.use("/api/users", userRoutes);

const Port = process.env.PORT || 3500;
app.listen(Port, () => {
  console.log(`Server is running on port: ${Port}`);
});
