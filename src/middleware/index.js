const express = require("express");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const OpenApiValidator = require("express-openapi-validator");
const swaggerDoc = YAML.load("./swagger.yaml");
const authenticate = require("./authenticate");
const morgan = require("morgan");

const applyMiddleWare = (app) => {
  app.use(express.json());
  app.use(morgan("dev"));
  // app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
  app.use(
    OpenApiValidator.middleware({
      apiSpec: "./swagger.yaml",
      validateRequests: true, // Enable request validation
      validateResponses: true, // Enable response validation
    })
  );
 
};

module.exports = applyMiddleWare;
