const { userExist, findUserByEmail, createUser } = require("../user/index");
const { notFound, badRequest } = require("../../utils/error");
const { generateHash, hashMatched } = require("../../utils/hashing");
const { generateToken } = require("../token");
const { log } = require("../../lib/log/index");

const register = async ({ username, name, email, password,ipAddress, userAgent  }) => {
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
      `login`,
      ipAddress,
      userAgent,
      "login Failed by invalid credentials",
      true,
      "/login"
    );
    throw badRequest("invalid credentials");
  }
  const matched = await hashMatched(password, user.password);
  if (!matched) {
    await log(
      email,
      `login`,
      ipAddress,
      userAgent,
      "login Failed by invalid credentials",
      true,
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
    `login`,
    ipAddress,
    userAgent,
    "Login Successful",
    true,
    "/login"
  );

  const accessToken = await generateToken({ payload });

  return {
    user,
    accessToken,
  };
};

module.exports = { register, login };
