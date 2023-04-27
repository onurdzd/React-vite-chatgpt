const express = require("express");
const cors = require("cors");
require('dotenv').config()

const gptRouter=require("./chatgtp/chatgpt-router")
const testRouter=require("./chatgtp/test")

const server = express();

server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "Hoşgeldin" });
});

server.use("/gpt",gptRouter);
server.use("/test",testRouter);

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = server;
