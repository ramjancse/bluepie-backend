const { Label } = require("../../model");
const defaults = require("../../config/defaults");
const { notFound } = require("../../utils/error");
const { ObjectId } = require("mongoose").Types;

const findAllItems = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  const filter = {
    labelName: { $regex: search, $options: "i" },
  };

  const labels = await Label.find()
    .populate({ path: "author", select: "labelName" })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return labels.map((label) => ({
    ...label._doc,
    id: label.id,
  }));
};

const count = ({ search = "" }) => {
  const filter = {
    labelName: { $regex: search, $options: "i" },
  };
  return Label.countDocuments(filter);
};

const create = async ({ labelName, author }) => {
  if (!labelName || !author) {
    const error = new Error("Invalid parameters");
    error.status = 400;
    throw error;
  }

  const label = new Label({
    labelName,
    status: "Pending Approval",
    author: author.id,
  });

  await label.save();
  return {
    ...label._doc,
    id: label.id,
  };
};

const findSingleItem = async (id) => {
  if (!id) throw new Error("Id is required");

  const label = await Label.findById(id);

  if (!label) {
    throw notFound();
  }

  // expand = expand.split(",").map((item) => item.trim());

  // if (expand.includes("author")) {
  //   await label.populate({
  //     path: "author",
  //     select: "name",
  //   });
  // }
  return {
    ...label._doc,
    id: label.id,
  };
};

const updateOrCreate = async (id, labelName) => {
  console.log("label ID", id, labelName);

  try {
    if (id) {
      // If ID exists, update the label
      let label = await Label.findByIdAndUpdate(
        id,
        { labelName: labelName },
        {
          new: true,
          upsert: true,
        }
      );

      return label;
    } else {
      // If ID does not exist, create a new label
      const newLabel = new Label(labelName);
      const savedLabel = await newLabel.save();

      return savedLabel;
    }
  } catch (error) {
    // Handle errors
    console.error("Error updating or creating label:", error);
    throw error;
  }
};

const removeItem = async (id, res) => {

  const label = await Label.findById(id);

  if (!label) {
    res.status(404).json({ error: "ID not found" }); // Sending a JSON response for ID not found
  } else {
    await Label.findByIdAndDelete(id);
    res.status(200).json({ message: "Data deleted successfully" }); // Sending a JSON response for successful deletion
  }
};

const checkOwnership = async ({ resourceId, userId }) => {
  const label = await label.findById(resourceId);
  if (label) {
    throw notFound();
  }
  if (label._doc.author.toString() === userId) {
    return true;
  }
  return false;
};

module.exports = {
  findAllItems,
  create,
  count,
  findSingleItem,
  updateOrCreate,
  // updateProperties,
  removeItem,
  checkOwnership,
};
