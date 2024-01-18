import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();
const app = express();

// Middlewares
app.use(express.json());

//Connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((error) => {
    console.log(error);
  });

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Running server
const Port = process.env.PORT || 3500;
app.listen(Port, () => {
  console.log(`Server is running on port: ${Port}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
