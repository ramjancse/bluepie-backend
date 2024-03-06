const albumService = require("../../../../lib/album");

const removeItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    await albumService.removeItem(id, res); // Sending `res` to the service function
  } catch (e) {
    next(e);
  }
};

module.exports = removeItem;
