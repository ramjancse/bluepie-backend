require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
// const swaggerDoc = YAML.load("./swagger.yaml");
// const OpenApiValidator = require("express-openapi-validator");
const { seedUser } = require("../src/seed");
const applyMiddleWare = require("./middleware/index");
const routes = require('./routes/index')

// express app.
const app = express();

// applyMiddleWare(app);

app.use(routes)
app.get("/health", (req, res) => {
  res.status(200).json({
    health: "OK",
    user: req.user,
  });
});

app.use((err, _req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});



module.exports = app;
