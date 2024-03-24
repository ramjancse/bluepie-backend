const albumService = require("../../../../lib/album");

const removeItem = async (req, res, next) => {
  const { id } = req.params;
  const email =  req.user.email
  const ipAddress = req.ip || req.connection.remoteAddress;
  const userAgent = req.userAgent;
  try {
    await albumService.removeItem(id, res,email, ipAddress, userAgent); // Sending `res` to the service function
  } catch (e) {
    next(e);
  }
};

module.exports = removeItem;
