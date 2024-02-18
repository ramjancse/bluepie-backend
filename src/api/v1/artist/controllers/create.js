const artistService = require("../../../../lib/artist");
const create = async (req, res, next) => {
  const { title, description, status, author } = req.body;
  try {
    const artist = await artistService.create({
      title,
      description,
      status,
      author: req.user.id,
    });

    console.log('artist', artist);
    const response = {
      code: 201,
      message: 'Created Successfully',
      data: {...artist},
      // links: {
      //   self: `/artists/${artist.id}`,
      //   author: `/artists/${artist.id}/author`,
      // }
    }

    res.status(201).json(response)
  } catch (e) {
    next(e)
  }
};

module.exports = create;
