const User = require("../../model/User");

const findAllItems = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
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



const findSingleItem = async (id) => {
  if (!id) throw new Error("Id is required");

  const user = await User.findById(id);

  if (!user) {
    throw notFound();
  }

  // expand = expand.split(",").map((item) => item.trim());

  // if (expand.includes("author")) {
  //   await artist.populate({
  //     path: "author",
  //     select: "name",
  //   });
  // }
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

const updateOrCreate = async (id, userData) => {
  try {
    let user;

    if (id) {
      const idByQuery = await User.findById(id);
      if (idByQuery && idByQuery._id.equals(id)) {
        user = await User.findByIdAndUpdate(id, userData, {
          new: true,
          upsert: true,
        });
        user = userData;
      } else {
        artist = new Artist(userData);
        await artist.save();
      }
    }

    return userData;
  } catch (error) {
    // Handle errors
    console.error("Error updating or creating artist:", error);
    throw error;
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

const createUser = async ({username, name, email, password, }) => {
  const user = new User({ username, name, email, password, profilePicture:'', status: 'pending'});
  await user.save();
  return { ...user._doc, id: user.id };
};

module.exports = {
  findAllItems,
  userExist,
  count,
  findSingleItem,
  updateOrCreate,
  createUser,
  findUserByEmail
};
