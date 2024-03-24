const artistService = require("../../../../lib/artist");
const { Artist } = require("../../../../model/Artist");
const log = require("../../../../lib/log/index");

const removeItem = async (req, res, next) => {
  const { id } = req.params;
  const email =  req.user.email
  const ipAddress = req.ip || req.connection.remoteAddress;
  const userAgent = req.userAgent;

  try {
    await artistService.removeItem(id, res,email, ipAddress, userAgent);
   
  } catch (e) {
    next(e);
  }
};

module.exports = removeItem;
