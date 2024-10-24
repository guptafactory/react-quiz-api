const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { config } = require("dotenv");

dotenv.config();

const app = express();

config({
  path: "./data/config.env",
});

app.use(express.static("public"));

// Middlewares
app.use(express.json());
// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URL],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

app.get("/", (req, res) => {
  res.send("<p>API working!</p>");
});

app.get("/api/questions", (req, res) => {
  const filePath = path.join(__dirname, "public", "data.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  res.status(200).json(data);
});

app.listen(
  process.env.PORT,
  "localhost",
  console.log(
    `Server is listening on port:${process.env.PORT} in ${process.env.NODE_ENV} mode`
  )
);
