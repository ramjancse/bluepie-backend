const { authenticationError } = require("../utils/error");
const noteService = require("../lib/note");

const ownership =
  (model = "") =>
  async (re, _res, next) => {
    if ((model = "Note")) {
      const isOwner = await noteService.checkOwnership({
        resourceId: req.params.id,
        userId: req.user.id,
      });
    }
    if (isOwner) {
      next();
    }
    return next(authenticationError());
  };

module.exports = ownership;
