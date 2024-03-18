const artistService = require("../../../../lib/artist");

const create = async (req, res, next) => {
  // Extract other fields from req.body
  const {
    artistType,
    status,
    nameOfType,
    artistName,
    fullName,
    artistImage,
    sex,
    artistLinks,
    socialMedia,
    region,
    artistDiscription,
    createdAt,
    updatedAt,
    author,
  } = req.body;

  try {
    const artist = await artistService.create({
      artistType,
      nameOfType,
      status,
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
      author: req.user.id,
    });

    const response = {
      code: 201,
      message: "Created Successfully",
      data: { ...artist },
      links: {
        self: `/artists/${artist.id}`,
        author: `/artists/${artist.id}/author`,
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = create;
