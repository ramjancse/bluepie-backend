const { Album } = require("../../model");
const defaults = require("../../config/defaults");
const { notFound } = require("../../utils/error");

const findAllItems = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
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
}) => {
  if (!albumName || !author) {
    const error = new Error("Invalid parameters");
    error.status = 400;
    throw error;
  }

  const album = new Album({
    artistId,
    albumType,
    albumName,
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

  await album.save();
  return {
    ...album._doc,
    id: album.id,
  };
};

const findSingleItem = async (id) => {
  if (!id) throw new Error("Id is required");

  const album = await Album.findById(id);

  if (!album) {
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
    ...album._doc,
    id: album.id,
  };
};

const updateOrCreate = async (id, albumData) => {
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
      } else {
        album = new Album(albumData);
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

// const updateProperties = async (id, { title, description, status }) => {
//   const artist = await Artist.findById(id);

//   if (!artist) {
//     throw notFound();
//   }

//   const payload = { title, description, status };
//   Object.keys(payload).forEach((key) => {
//     artist[key] = payload[key] ?? artist[key];
//   });
//   // artist.title = title ?? artist.title
//   // artist.description = description ?? artist.description
//   // artist.status = status ?? artist.status

//   await artist.save();
//   return { ...artist._doc, id: artist.id };
// };

const removeItem = async (id, res) => {
  const album = await Album.findById(id);

  if (!album) {
    res.status(404).json({ error: "ID not found" }); // Sending a JSON response for ID not found
  } else {
    await Album.findByIdAndDelete(id);
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
