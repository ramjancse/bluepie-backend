const { Album } = require("../../model");
const defaults = require("../../config/defaults");
const { notFound } = require("../../utils/error");
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
    artistName: { $regex: search, $options: "i" },
  };

  const albums = await Album.find()
    .populate({ path: "author", select: "albumName" })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  await log(email,`Query`,ipAddress, userAgent,"All albums query", true,"/albums");

  return albums.map((album) => ({
    ...album._doc,
    id: album.id,
  }));
};

const count = ({ search = "" }) => {
  const filter = {
    albumName: { $regex: search, $options: "i" },
  };
  return Album.countDocuments(filter);
};

const create = async ({
  artistId,
  albumType,
  albumName,
  status,
  albumCover,
  albumGenre,
  metadataLanguage,
  primaryArtist,
  featuringArtist,
  originalReleaseDate,
  recordLabel,
  pLineYear,
  pLine,
  cLineYear,
  cLine,
  upcean,
  tracks,
  author,
  email,
  ipAddress,
  userAgent,
}) => {
  if (!albumName || !author) {
    const error = new Error("Invalid parameters");
    error.status = 400;
    await log(email,`Create Error`,ipAddress, userAgent,"Id Not Found",true,"/albums/add");
    throw error;
  }

  const album = new Album({
    artistId,
    albumType,
    albumName,
    status,
    albumCover,
    albumGenre,
    metadataLanguage,
    primaryArtist,
    featuringArtist,
    originalReleaseDate,
    recordLabel,
    pLineYear,
    pLine,
    cLineYear,
    cLine,
    upcean,
    tracks,
    author,
  });
  await log(email,`Created`,ipAddress, userAgent,"Album created",true,"/albums/add");

  await album.save();
  return {
    ...album._doc,
    id: album.id,
  };
};

const findSingleItem = async (id, email, ipAddress, userAgent) => {
  if (!id) {
    await log(email,`Query`,ipAddress, userAgent,`Id Not Found : ${id}`,true,`/albums/${id}`);
    throw new Error("Id is required");
  }

  const album = await Album.findById(id);

  if (!album) {
    await log(email,`Query`,ipAddress, userAgent,`Id Not Found : ${id}`,true,`/albums/${id}`);
    throw notFound();
  }

  // expand = expand.split(",").map((item) => item.trim());

  // if (expand.includes("author")) {
  //   await artist.populate({
  //     path: "author",
  //     select: "name",
  //   });
  // }
  await log(email,`Query`,ipAddress, userAgent,`Single Album Send : ${id}`,true,`/albums/${id}`);
  return {
    ...album._doc,
    id: album.id,
  };
};

const updateOrCreate = async (id, albumData, email, ipAddress, userAgent) => {
  try {
    let album;

    if (id) {
      const idByQuery = await Album.findById(id);
      if (idByQuery && idByQuery._id.equals(id)) {
        album = await Album.findByIdAndUpdate(id, albumData, {
          new: true,
          upsert: true,
        });

        album = albumData;
        await log(email,`Updated`,ipAddress, userAgent,`Single Album Updated : ${id}`,true,`/albums/${id}`);
      } else {
        album = new Album(albumData);
        await log(email,`Created`,ipAddress, userAgent,`Single Album Created : ${id}`,true,`/albums/${id}`);
        await album.save();
      }
    }

    return albumData;
  } catch (error) {
    // Handle errors
    console.error("Error updating or creating:", error);
    throw error;
  }
};

const removeItem = async (id, res, email, ipAddress, userAgent) => {
  const album = await Album.findById(id);

  if (!album) {
    await log(email,`Delete`,ipAddress, userAgent,`Attempt to Delete Single Album: ${id},  Id Not Found`,true,`/albums/${id}`);
    res.status(404).json({ error: "ID not found" }); // Sending a JSON response for ID not found
  } else {
    await Album.findByIdAndDelete(id);
    await log(email,`Delete`,ipAddress, userAgent,`Album Deleted Successfully: ${id}`,true,`/albums/${id}`);
    res.status(200).json({ message: "Data deleted successfully" }); // Sending a JSON response for successful deletion
  }
};

// const checkOwnership = async ({ resourceId, userId }) => {
//   const artist = await Artist.findById(resourceId);
//   if (artist) {
//     throw notFound();
//   }
//   if (artist._doc.author.toString() === userId) {
//     return true;
//   }
//   return false;
// };

module.exports = {
  findAllItems,
  create,
  count,
  findSingleItem,
  updateOrCreate,
  // updateProperties,
  removeItem,
  // checkOwnership,
};
