const userService = require("../../../../lib/user");
const { User } = require("../../../../model/User");
const log = require("../../../../lib/log/index");


const removeItem = async (req, res, next) => {
  const { id } = req.params;
  const email =  req.user.email
  const ipAddress = req.ip || req.connection.remoteAddress;
  const userAgent = req.userAgent;

  try {
    await userService.removeItem(id,email, ipAddress, userAgent, res);
  } catch (e) {
    next(e);
  }
};

module.exports = removeItem;
