const express = require("express");

const movieRouter = require("./movie");

const app = express();

app.use("/movie", movieRouter);

module.exports = app;
