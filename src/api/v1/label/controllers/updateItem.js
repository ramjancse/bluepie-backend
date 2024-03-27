const labelService = require("../../../../lib/label");

const updateItem = async (req, res, next) => {
  const { id } = req.params;
  const { labelName } = req.body;
  const email = req.user.email;
  const ipAddress = req.ip || req.connection.remoteAddress;
  const userAgent = req.userAgent;

  try {
    const label = await labelService.updateOrCreate(id, labelName,website, address, country, state,email, ipAddress, userAgent);

    const response = {
      code: 200,
      message: "Updated successfully",
      data: label,
      links: {
        self: `labels/${label.id}`,
      },
    };
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateItem;
