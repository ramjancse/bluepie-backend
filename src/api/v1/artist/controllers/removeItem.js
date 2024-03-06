const artistService = require("../../../../lib/artist");
const { Artist } = require("../../../../model/Artist");
const removeItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    await artistService.removeItem(id, res); // Sending `res` to the service function
  } catch (e) {
    next(e);
  }
};

module.exports = removeItem;
