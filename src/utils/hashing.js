const bcrypt = require("bcryptjs");

const generateHash = async (payload, saltRound = 10) => {
  const salt = await bcrypt.genSalt(saltRound);
  return await bcrypt.hash(payload, salt);
};

const hashMatched = async (raw, hash) => {
  const result = await bcrypt.compare(raw, hash);
  return result;
};

module.exports = {
  generateHash,
  hashMatched,
};
