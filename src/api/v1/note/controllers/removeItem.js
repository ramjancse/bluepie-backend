const noteService = require("../../../../lib/note");

const removeItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    await noteService.removeItem(id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = removeItem;
