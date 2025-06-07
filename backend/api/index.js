const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const masukin = require("../routes/routes");

dotenv.config();

const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

let isConnected = false;
async function connectToDB() {
  if (!isConnected) {
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;
    console.log("✅ Connected to MongoDB");
  }
}

app.get("/ping", (req, res) => {
  res.json({ message: "pong!" });
});


app.use(async (req, res, next) => {
  await connectToDB();
  next();
});

app.get("/", (req, res) => {
  res.send("✅ Backend API is running.");
});

app.use("/api/masukin", masukin);

module.exports = app; // penting untuk vercel
