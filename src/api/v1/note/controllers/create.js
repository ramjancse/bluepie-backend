const noteService = require("../../../../lib/note");
const create = async (req, res, next) => {
  const { title, description, status, author } = req.body;
  try {
    const note = await noteService.create({
      title,
      description,
      status,
      author: req.user.id,
    });

    console.log('note', note);
    const response = {
      code: 201,
      message: 'Created Successfully',
      data: {...note},
      // links: {
      //   self: `/notes/${note.id}`,
      //   author: `/notes/${note.id}/author`,
      // }
    }

    res.status(201).json(response)
  } catch (e) {
    next(e)
  }
};

module.exports = create;
