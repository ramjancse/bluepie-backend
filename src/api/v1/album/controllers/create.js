const albumService = require("../../../../lib/album");

const create = async (req, res, next) => {
  // Extract other fields from req.body
  const {
    artistId,
    status,
    albumStatus,
    releaseVersion,
    releaseType,
    formatType,
    releaseTitle,
    releaseCover,
    releaseGenre,
    releaseSubGenre,
    platforms,
    metadataLanguage,
    releasePrimaryArtist,
    releaseSecondaryArtist,
    originalReleaseDate,
    digitalReleaseDate,
    recordLabel,
    pLineCompany,
    pLineYear,
    cLineCompany,
    cLineYear,
    upcean,
    link,
    releaseLanguage,
    catalogNumber,
    releaseExplicit,
    timestamps,
    versionKey,
    tracks,
  } = req.body;

  const email = req.user.email;
  const ipAddress = req.ip || req.connection.remoteAddress;
  const userAgent = req.userAgent;
  // Resize the image to 1000x1000px

  try {
    const album = await albumService.create({
      artistId,
      status,
      albumStatus,
      releaseVersion,
      releaseType,
      formatType,
      releaseTitle,
      releaseCover,
      releaseGenre,
      releaseSubGenre,
      platforms,
      metadataLanguage,
      releasePrimaryArtist,
      releaseSecondaryArtist,
      originalReleaseDate,
      digitalReleaseDate,
      recordLabel,
      pLineCompany,
      pLineYear,
      cLineCompany,
      cLineYear,
      upcean,
      link,
      releaseLanguage,
      catalogNumber,
      releaseExplicit,
      timestamps,
      versionKey,
      tracks,
      author: req.user.id,
      email,
      ipAddress,
      userAgent,
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
