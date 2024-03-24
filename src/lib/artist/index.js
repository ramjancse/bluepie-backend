const { Artist } = require("../../model");
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
    artistName: { $regex: search, $options: "i" },
  };

  const artists = await Artist.find()
    .populate({ path: "author", select: "artistName" })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  await log(email,`Query`, ipAddress, userAgent, "Send All Artist Data", true, `/artists`);

  return artists.map((artist) => ({
    ...artist._doc,
    id: artist.id,
  }));
};

const count = ({ search = "" }) => {
  const filter = {
    artistName: { $regex: search, $options: "i" },
  };
  return Artist.countDocuments(filter);
};

const create = async ({
  artistType,
  status,
  nameOfType,
  artistName,
  fullName,
  sex,
  artistImage,
  artistLinks,
  socialMedia,
  region,
  artistDiscription,
  createdAt,
  updatedAt,
  author,
  email,
  ipAddress,
  userAgent,
}) => {
  if (!artistName || !author) {
    const error = new Error("Invalid parameters");
    error.status = 400;
    throw error;
  }

  const artist = new Artist({
    artistType,
    status,
    nameOfType,
    artistName,
    fullName,
    sex,
    artistImage,
    artistLinks,
    socialMedia,
    region,
    artistDiscription,
    createdAt,
    updatedAt,
    author: author.id,
  });

  await artist.save();
  await log(email, `Created`, ipAddress, userAgent, "New Artist Created", true, "/artists/add");

  return {
    ...artist._doc,
    id: artist.id,
  };
};

const findSingleItem = async (id, email, ipAddress, userAgent) => {
  if (!id) {
    await log(email,`Query`,ipAddress, userAgent,`Single Artist Query Not Found: ${id}`, true, `/artists/${id}`);
    throw new Error("Id is required")
  };

  const artist = await Artist.findById(id);

  if (!artist) {
    await log(email, `Query`, ipAddress, userAgent, "Id Not Found", true, `/artists/${id}`);
    throw notFound();
  }

  // expand = expand.split(",").map((item) => item.trim());

  // if (expand.includes("author")) {
  //   await artist.populate({
  //     path: "author",
  //     select: "name",
  //   });
  // }
  await log(email,`Query`,ipAddress, userAgent, `Single Artist data: ${id}`,true,`/artists/${id}`);
  return {
    ...artist._doc,
    id: artist.id,
  };
};

const updateOrCreate = async (id, artistData,email, ipAddress, userAgent) => {
  try {
    let artist;

    if (id) {
      const idByQuery = await Artist.findById(id);
      if (idByQuery && idByQuery._id.equals(id)) {
        artist = await Artist.findByIdAndUpdate(id, artistData, {
          new: true,
          upsert: true,
        });
        await log(email,'Update', ipAddress, userAgent,`Single Artist data updated:  ${id}`,true, `/artist/${id}`);

        artist = artistData;
      } else {
        artist = new Artist(artistData);
        await artist.save();
        await log(email,'Create', ipAddress, userAgent,`Single Artist data Create:  ${id}`,true, `/artist/${id}`);
      }
    }

    return artistData;
  } catch (error) {
    // Handle errors
    console.error("Error updating or creating artist:", error);
    await log(email,'Error', ipAddress, userAgent,`Error to update artist data:  ${id}`,true, `/artist/${id}`);
    throw error;
  }
};

// const artist = await Artist.findById(id);
// artist = await Artist.findByIdAndUpdate(_id, rest, { new: true, upsert: true });
// console.log("artist->>>", artist);
// return artist;

const updateProperties = async (id, { title, description, status }) => {
  const artist = await Artist.findById(id);

  if (!artist) {
    throw notFound();
  }

  const payload = { title, description, status };
  Object.keys(payload).forEach((key) => {
    artist[key] = payload[key] ?? artist[key];
  });

  await artist.save();
  return { ...artist._doc, id: artist.id };
};

const removeItem = async (id, res, email, ipAddress, userAgent) => {
  const artist = await Artist.findById(id);

  if (!artist) {
    await log(email,`Delete`, ipAddress, userAgent, "Id Not Found :", true, `/artist/${id}`);
    res.status(404).json({ error: "ID not found" }); // Sending a JSON response for ID not found
  } else {
    await Artist.findByIdAndDelete(id);
    await log(email,`Delete`, ipAddress, userAgent, "Artist Data deleted successfully", true, `/artist/${id}`);
    res.status(200).json({ message: "Data deleted successfully" }); // Sending a JSON response for successful deletion
  }
};

const checkOwnership = async ({ resourceId, userId }) => {
  const artist = await Artist.findById(resourceId);
  if (artist) {
    throw notFound();
  }
  if (artist._doc.author.toString() === userId) {
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
  updateProperties,
  removeItem,
  checkOwnership,
};
