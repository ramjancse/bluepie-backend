const albumService = require("../../../../lib/album");
const create = async (req, res, next) => {
  const {
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
    plineYear,
    pline,
    clineYear,
    cline,
    upcean,
    tracks,
  } = req.body;
  try {
    const album = await albumService.create({
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
      plineYear,
      pline,
      clineYear,
      cline,
      upcean,
      tracks,
      author: req.user.id,
    });

    console.log("album", album);
    const response = {
      code: 201,
      message: "Created Successfully",
      data: { ...album },
      // links: {
      //   self: `/artists/${artist.id}`,
      //   author: `/artists/${artist.id}/author`,
      // }
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = create;
