
import express from "express";
import mongoose from "mongoose";
import 'dotenv/config'
import cors from "cors";
import mainRoutes from "./src/api/v1/routes/index.js";
import { connectDb } from "./src/config/db.js";
const port = process.env.PORT || 5500;

const app = express();

// Enable CORS for frontend origin
app.use(
  cors({
    origin: "*", // Allow Vite frontend
    // origin: 'http://localhost:5173', // Allow Vite frontend
    credentials: true, // If sending cookies or auth headers
  })
);

app.use(express.json());

app.use("/api/v1", mainRoutes);

app.get("/", (req, res) => {
  res.send("Welcome, Server is running!");
});
let startingTime=1;
const startIngServer = async () => {
  try {
    startingTime+=1;
    if(startingTime<6){
      await connectDb(process.env.MONGO_URI);

      app.listen(port, () => console.log(`Server running on port = ${port} `));
    }else{
      console.log("something is wrong",process.env.MONGO_URI)
    }
  } catch (err) {
    console.log(err);
    // startIngServer();
  }
};

startIngServer()

