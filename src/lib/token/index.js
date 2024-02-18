const jwt = require("jsonwebtoken");
const { serverError } = require("../../utils/error");

const generateToken = async ({
  payload,
  algorithm = "HS256",
  secret = process.env.ACCESS_TOKEN_SECRET,
  expiresIn = '1h'
}) => {
  try {
    return await jwt.sign(payload, secret, {
      algorithm, expiresIn
    });
  } catch (error) {
    throw serverError();
  }
};

const decodeToken = ({
  token,
  algorithm = "HS256",
  //   secret = process.env.ACCESS_TOKEN_SECRET,
}) => {
  try {
    return jwt.decode(token, {algorithms: [algorithm]});
  } catch (error) {
    throw serverError();
  }
};

const verifyToken = ({
    token,
    algorithm = "HS256",
    secret = process.env.ACCESS_TOKEN_SECRET,
   
  }) => {
    try {
      return jwt.verify(token, secret, {
        algorithms: [algorithm],
      });
    } catch (error) {
      throw serverError();
    }
  };


module.exports = { generateToken, decodeToken, verifyToken};
