// implement your server here
const express = require("express");
const postRouter = require("./posts/posts-router");
const server = express();

server.use(express.json());
server.use("/api/posts", postRouter);
// require your posts router and connect it here

module.exports = server;
