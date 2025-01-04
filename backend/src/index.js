import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";

dotenv.config({});
const app = express();

const PORT = process.env.PORT || 8000;

// middleware
app.use(express.json())
app.use(cookieParser());


// routes
app.use("/api/v1/user", userRoute); // http://localhost:8080/api/v1/user

app.listen(PORT, () => {
  connectDB();
  console.log(`Server listen at port ${PORT}`);
});
