const noteService = require("../../../../lib/note");

const updateItemPatch = async (req, res, next) => {
  const { id } = req.params;
 
  try {
    const note = await noteService.updateProperties(id, req.body);

    const response ={
      code: 200,
      message: 'Updated successfully',
      data : note,
      links:{
        self: `notes/${note.id}`
      }
    }
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateItemPatch;
