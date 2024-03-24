const User = require("../../model/User");
const {log} = require("../../lib/log/index");

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
    userName: { $regex: search, $options: "i" },
  };

  const users = await User.find()
    .populate({ path: "username", select: "name" })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  await log(
    email,
    "Query",
    ipAddress,
    userAgent,
    "Find All user Successfully",
    true,
    "/users"
  );

  return users.map((user) => ({
    ...user._doc,
    id: user.id,
  }));
};

const count = ({ search = "" }) => {
  const filter = {
    username: { $regex: search, $options: "i" },
  };
  return User.countDocuments(filter);
};

const findSingleItem = async (id,email, ipAddress, userAgent) => {
  if (!id) {
    await log(
      email,
      `Query`,
      ipAddress,
      userAgent,
      "User Id is required",
      true,
      "/users"
    );
    throw new Error("Id is required");
  }

  const user = await User.findById(id);

  if (!user) {
    await log(
      email,
      `Query`,
      ipAddress,
      userAgent,
      "User Id Not Found",
      true,
      "/users"
    );
    throw notFound();
  }

  // expand = expand.split(",").map((item) => item.trim());

  // if (expand.includes("author")) {
  //   await artist.populate({
  //     path: "author",
  //     select: "name",
  //   });
  // }

  await log(
    email,
    `Query`,
    ipAddress,
    userAgent,
    "All user Query Successful",
    true,
    "/users"
  );

  return {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    profilePicture: user.profilePicture,
  };
};

const updateOrCreate = async (id, userData, ipAddress, userAgent, email) => {
  try {
    let user;

    if (id) {
      const idByQuery = await User.findById(id);
      if (idByQuery && idByQuery._id.equals(id)) {
        user = await User.findByIdAndUpdate(id, userData, {
          new: true,
          upsert: true,
        });
        await log(email, `Updated`,ipAddress, userAgent, "User Updated Successfully",true, `/users/${id}`);
        user = userData;
      } else {
        user = new User(userData);
        await user.save();
        await log(email, `Created`, ipAddress, userAgent,"User Created Successfully",true,`/users/${id}`);
      }
    }

    return userData;
  } catch (error) {
    // Handle errors
    // console.error("Error updating or creating artist:", error);
    throw error;
  }
};

const removeItem = async (id, email, ipAddress, userAgent, res) => {
  const user = await User.findById(id);

  if (!user) {
    await log(email, `Delete`,ipAddress,userAgent,"Deleted Not Successfully", false,`/users/${id}`);
    res.status(404).json({ error: "ID not found" }); // Sending a JSON response for ID not found
  } else {
    await User.findByIdAndDelete(id);
    await log(email, `Deleted`,ipAddress,userAgent,"Deleted Successfully", true,`/users/${id}`);
    res.status(200).json({ message: "Data deleted successfully" }); // Sending a JSON response for successful deletion
  }
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user ? user : false;
};

const userExist = async (email) => {
  const user = await findUserByEmail(email);
  return user ? true : false;
};

const createUser = async ({ username, name, email, password,ipAddress, userAgent  }) => {
  const user = new User({
    username,
    name,
    email,
    password,
    profilePicture: "",
    status: "pending",
  });
  await user.save();
  await log(email,`Register`,ipAddress, userAgent,"New Registration",true,"/register");

  return { ...user._doc, id: user.id };
};

module.exports = {
  findAllItems,
  userExist,
  count,
  findSingleItem,
  updateOrCreate,
  createUser,
  findUserByEmail,
  removeItem
};
