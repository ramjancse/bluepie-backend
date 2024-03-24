const { userExist, findUserByEmail, createUser } = require("../user/index");
const { notFound, badRequest } = require("../../utils/error");
const { generateHash, hashMatched } = require("../../utils/hashing");
const { generateToken } = require("../token");
// const Log = require("../../model/Log");
const log = require("../log/index");

const register = async ({ username, name, email, password }) => {
  const hasUser = await userExist(email);

  if (hasUser) {
    throw badRequest("user already exist");
  }

  password = await generateHash(password);
  const user = await createUser({ username, name, email, password });

  return user;
};

const login = async ({ email, password, ipAddress, userAgent }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    await log(
      email,
      "login",
      ipAddress,
      userAgent,
      "Wrong Email Address",
      false,
      "/login"
    );

    throw badRequest("invalid credentials");
  }
  const matched = await hashMatched(password, user.password);
  if (!matched) {
    await log(
      email,
      "login",
      ipAddress,
      userAgent,
      "Tried by Wrong Password",
      false,
      "/login"
    );
    throw badRequest("invalid credentials");
  }
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  await log(
    email,
    "login",
    ipAddress,
    userAgent,
    "user logged in Successfully",
    true,
    "/dashboard"
  );

  const accessToken = await generateToken({ payload });

  return {
    user,
    accessToken,
  };
};

module.exports = { register, login };
