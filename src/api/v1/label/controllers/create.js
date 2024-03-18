const labelService = require("../../../../lib/label");

const create = async (req, res, next) => {
  // Extract other fields from req.body
  const {
    labelName,
    author,
  } = req.body;

  try {
    const label = await labelService.create({
      labelName,
      status: "Pending Approval",
      author: req.user.id,
    });

    const response = {
      code: 201,
      message: "Created Successfully",
      data: { ...label },
      links: {
        self: `/labels/${label.id}`,
        author: `/labels/${label.id}/author`,
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = create;
