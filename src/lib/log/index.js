const Log = require("../../model/Log");

const findAllItems = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  const filter = {
    email: { $regex: search, $options: "i" },
  };

  const logs = await Log.find()
    .populate({ path: "email", select: "email" })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return logs.map((log) => ({
    ...log._doc,
    id: log.id,
  }));
};

const count = ({ search = "" }) => {
  const filter = {
    email: { $regex: search, $options: "i" },
  };
  return Log.countDocuments(filter);
};

const log = async (
  email,
  activityType,
  ipAddress,
  userAgent,
  actionDetails,
  success,
  referer
) => {
  try {
    const newLog = new Log({
      email: email,
      activityType: activityType,
      ipAddress: ipAddress,
      userAgent: userAgent,
      actionDetails: actionDetails,
      success: success,
      referer: referer,
    });

    await newLog.save();
    console.log("Log saved successfully.");
  } catch (error) {
    console.error("Error occurred while saving log:", error);
  }
};

module.exports = {
  findAllItems,
  count,
  log,
};
