const express = require("express");

const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const connectDB = require("./server/config/db");

const app = express();

mongoose.set("strictQuery", false);

require("dotenv").config();

const router = require("./server/routes/index");

connectDB();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.json("Welcome to contact app.");
});

app.use("/api", router);

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.listen(port, () => {
  console.log("Listening on port", port);
});
