const labelService = require("../../../../lib/label");

const removeItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    await labelService.removeItem(id, res); // Sending `res` to the service function
  } catch (e) {
    next(e);
  }
};

module.exports = removeItem;
