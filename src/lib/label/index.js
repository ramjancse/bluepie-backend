const { Label } = require("../../model");
const defaults = require("../../config/defaults");
const { notFound } = require("../../utils/error");
const { ObjectId } = require("mongoose").Types;
const log = require("../../lib/log/index");

const findAllItems = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
  email,
  ipAddress,
  userAgent,
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

  // await log(
  //   email,
  //   `Query`,
  //   ipAddress,
  //   userAgent,
  //   "Query for All Label",
  //   true,
  //   `/labels/${id}`
  // );

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

const create = async ({ labelName, author, email, ipAddress, userAgent }) => {
  if (!labelName || !author) {
    const error = new Error("Invalid parameters");
    error.status = 400;
    // await log(
    //   email,
    //   `Create`,
    //   ipAddress,
    //   userAgent,
    //   "Invalid parameters",
    //   true,
    //   `/labels/${id}`
    // );
    throw error;
  }

  const label = new Label({
    labelName,
    status: "Pending Approval",
    author: author.id,
  });

  await label.save();
  // await log(
  //   email,
  //   `Create`,
  //   ipAddress,
  //   userAgent,
  //   "Label Created",
  //   true,
  //   `/labels/add`
  // );

  return {
    ...label._doc,
    id: label.id,
  };
};

const findSingleItem = async (id, email, ipAddress, userAgent) => {
  if (!id) {
    // await log(email,`Query`,ipAddress, userAgent,"Id Not Found",true,`/labels/${id}`);
    throw new Error("Id is required");

  }

  const label = await Label.findById(id);

  if (!label) {
    // await log(
    //   email,
    //   `Query`,
    //   ipAddress,
    //   userAgent,
    //   "Id Not Found",
    //   true,
    //   `/labels/${id}`
    // );
    throw notFound();
  }

  // expand = expand.split(",").map((item) => item.trim());

  // if (expand.includes("author")) {
  //   await label.populate({
  //     path: "author",
  //     select: "name",
  //   });
  // }
  // await log(email,`Query`,ipAddress, userAgent,`Single Label: ${id}`,true,`/labels/${id}`);
  return {
    ...label._doc,
    id: label.id,
  };
};

const updateOrCreate = async (id, labelName, email, ipAddress, userAgent) => {
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
      // await log(email,`Update`,ipAddress, userAgent,`Label Updated Successfully ${id}`,true,`/labels/${id}`); 
      return label;
    } else {
      // If ID does not exist, create a new label
      const newLabel = new Label(labelName);
      const savedLabel = await newLabel.save();
      // await log(email,`Create`,ipAddress, userAgent,`Label Create Successfully ${id}`,true,`/labels/${id}`); 
      return savedLabel;
    }
  } catch (error) {
    // Handle errors
    console.error("Error updating or creating label:", error);
    throw error;
  }
};

const removeItem = async (id, res,email, ipAddress, userAgent) => {
  const label = await Label.findById(id);
  
  if (!label) {
    // await log(email,`Delete`,ipAddress, userAgent,"Id Not Found",true,`/labels/${id}`);
    res.status(404).json({ error: "ID not found" }); // Sending a JSON response for ID not found
  } else {
    await Label.findByIdAndDelete(id);
    // await log(email,`Deleted`,ipAddress, userAgent,`Label Deleted Successfully ${id}`,true,`/labels/${id}`);
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
