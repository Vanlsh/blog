import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { router } from "./routes/router.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/uploads", express.static("uploads"));
app.use("/api", router);

mongoose
  .connect(
    "mongodb+srv://site:qwert@cluster0.qhema.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB ok");
  })
  .catch((err) => console.log("DB error", err));

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
