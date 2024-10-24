import express from "express";
import { config } from "dotenv";
import path from "path";
import fs from "fs";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

config({
  path: "./data/config.env",
});

app.use(express.static("public"));

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("<p>API working!</p>");
});

app.get("/api/questions", (req, res) => {
  fs.readFile("./public/data.json", "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "File reading error" });

    try {
      const data = JSON.parse(data);
      res.status(200).json(data);
    } catch (parseErr) {
      res.status(500).json({ error: "JSON parsing error" });
    }
  });
});

app.listen(
  process.env.PORT,
  "localhost",
  console.log(
    `Server is listening on port:${process.env.PORT} in ${process.env.NODE_ENV} mode`
  )
);
