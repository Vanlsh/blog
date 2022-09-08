import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./routes/router.js";

const app = express();
dotenv.config();

//Const

const PORT = process.env.PORT || 4444;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

//Middleware

app.use("/api/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());

//Routes

app.use("/api", router);

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.qhema.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    );
    app.listen(PORT, () => console.log("Server OK"));
  } catch (error) {
    console.log(error);
  }
}

start();
