const artistService = require("../../../../lib/artist");

const removeItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    await artistService.removeItem(id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = removeItem;
