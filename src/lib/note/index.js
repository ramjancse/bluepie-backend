const { Note } = require("../../model");
const defaults = require("../../config/defaults");
const { notFound } = require("../../utils/error");

const findAll = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  const filter = {
    title: { $regex: search, $options: "i" },
  };

  const notes = await Note.find(filter)
    .populate({ path: "author", select: "name" })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return notes.map((note) => ({
    ...note._doc,
    id: note.id,
  }));
};

const count = ({ search = "" }) => {
  const filter = {
    title: { $regex: search, $options: "i" },
  };
  return Note.count(filter);
};

const create = async ({
  title,
  description = "",
  status = "not_completed",
  author,
}) => {
  if (!title || !author) {
    const error = new Error("Invalid parameters");
    error.status = 400;
    throw error;
  }

  const note = new Note({
    title,
    description,
    status,
    author: author.id,
  });

  await note.save();
  return {
    ...note._doc,
    id: note.id,
  };
};

const findSingleItem = async (id) => {
  if (!id) throw new Error("Id is required");

  const note = await Note.findById(id);

  if (!note) {
    throw notFound();
  }

  // expand = expand.split(",").map((item) => item.trim());

  // if (expand.includes("author")) {
  //   await note.populate({
  //     path: "author",
  //     select: "name",
  //   });
  // }
  return {
    ...note._doc,
    id: note.id,
  };
};

const updateOrCreate = async (
  id,
  title,
  description,
  author,
  status = "not_completed"
) => {
  const note = await Note.findById(id);

  // if (!id) throw new Error("Id is required");

  if (!note) {
    const note = create({ title, description, status, author });
    return {
      note,
      code: 201,
    };
  }

  const payload = {
    title,
    description,
    author,
    status,
  };
  console.log("payload->>", payload);
  note.overwrite(payload);
  await note.save();
  return { note: { ...note._doc, id: note.id }, code: 200 };
};

const updateProperties = async (id, { title, description, status }) => {
  const note = await Note.findById(id);

  if (!note) {
    throw notFound();
  }

  const payload = { title, description, status };
  Object.keys(payload).forEach((key) => {
    note[key] = payload[key] ?? note[key];
  });
  // note.title = title ?? note.title
  // note.description = description ?? note.description
  // note.status = status ?? note.status

  await note.save();
  return { ...note._doc, id: note.id };
};

const removeItem = async (id) => {
  const note = await Note.findById(id);

  if (!note) {
    throw notFound();
  }
  return Note.findByIdAndDelete(id);
};

const checkOwnership = async ({ resourceId, userId }) => {
  const note = await Note.findById(resourceId);
  if (note) {
    throw notFound();
  }
  if (note._doc.author.toString() === userId) {
    return true;
  }
  return false;
};
module.exports = {
  findAll,
  create,
  count,
  findSingleItem,
  updateOrCreate,
  updateProperties,
  removeItem,
  checkOwnership,
};
