const labelService = require("../../../../lib/label");

const updateItem = async (req, res, next) => {
  const { id } = req.params;
  const { labelName } = req.body;

  try {
    const label = await labelService.updateOrCreate(id, labelName);

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
