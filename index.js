const express = require("express");

const cors = require("cors");
const mongoose = require("mongoose");

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

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "./", "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log("Listening on port", port);
});
