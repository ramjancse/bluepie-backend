const artistService = require("../../../../lib/artist");

const create = async (req, res, next) => {
  // Extract other fields from req.body
  const {
    artistType,
    status,
    nameOfType,
    name,
    fullName,
    artistImage,
    sex,
    artistLinks,
    socialMedia,
    region,
    artistEmail,
    areaCode,
    phoneNumber,
    address,
    artistDescription,
    createdAt,
    updatedAt,
    author,
  } = req.body;
  const email = req.user.email;
  const ipAddress = req.ip || req.connection.remoteAddress;
  const userAgent = req.userAgent;

  try {
    const artist = await artistService.create({
      artistType,
      nameOfType,
      status,
      name,
      fullName,
      sex,
      artistImage,
      artistLinks,
      socialMedia,
      region,
      artistEmail,
      areaCode,
      phoneNumber,
      address,
      artistDescription,
      createdAt,
      updatedAt,
      author: req.user.id,
      email,
      ipAddress,
      userAgent,
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
