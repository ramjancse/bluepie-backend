const noteService = require("../../../../lib/note");

const updateItem = async (req, res, next) => {
  const { id } = req.params;
  const status = req.body.status || "not_completed";
  console.log("id from here", id);

  try {
    const {note, code} = await noteService.updateOrCreate(id, {
      title: req.body.title,
      description: req.body.description,
      author: req.user,
      status,
    });

    const response ={
      code,
      message: code === 200? 'Updated successfully' : 'Created successfully',
      data : note,
      links:{
        self: `notes/${note.id}`
      }
    }
    res.status(code).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateItem;
