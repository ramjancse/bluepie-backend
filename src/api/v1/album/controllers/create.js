const albumService = require("../../../../lib/album");


const create = async (req, res, next) => {
    // Extract other fields from req.body
    const {
      artistId,
      albumType,
      albumName,
      albumGenre,
      albumCover,
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
    } = req.body;


    // Resize the image to 1000x1000px

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
        pLineYear,
        pLine,
        cLineYear,
        cLine,
        upcean,
        tracks,
        author: req.user.id,
      });

      const response = {
        code: 201,
        message: "Created Successfully",
        data: { ...album },
        links: {
          self: `/albums/${album.id}`,
          author: `/albums/${album.id}/author`,
        },
      };

      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  
};

module.exports = create;