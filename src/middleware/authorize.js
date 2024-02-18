const express = require("express");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const openApiValidator = require("express-openapi-validator");
const swaggerDoc = YAML.load("./swagger.yaml");
const tokenService = require("../lib/token");
const { authenticationError, authorizationError } = require("../utils/error");
const userService = require("../lib/user");

const authorize =
  (roles = ["user"]) =>
  (req, _res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    }
    return next(authorizationError());
  };
module.exports = authorize;
