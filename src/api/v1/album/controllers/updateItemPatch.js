const artistService = require("../../../../lib/artist");

const updateItemPatch = async (req, res, next) => {
  const { id } = req.params;
 
  try {
    const artist = await artistService.updateProperties(id, req.body);

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

module.exports = updateItemPatch;
