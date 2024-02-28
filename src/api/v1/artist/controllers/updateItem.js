const artistService = require("../../../../lib/artist");

const updateItem = async (req, res, next) => {
  const { id } = req.params;

  const {
     artistType,
    nameOfType,
    artistName,
    fullName,
    sex,
    region,
    artistImage,
    artistDiscription,
    artistLinks,
    socialMedia
  } = req.body;

  const artistData = {
    id,
    artistType,
    nameOfType,
    artistName,
    fullName,
    sex,
    region,
    artistImage,
    artistDiscription,
    artistLinks,
    socialMedia
  };



  try {
    const artist = await artistService.updateOrCreate(id, artistData);
    const response ={
      code: 200,
      message: 'Updated successfully',
      data : artist,
      links:{
        self: `artists/${artist.id}`
      }
    }
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateItem;
