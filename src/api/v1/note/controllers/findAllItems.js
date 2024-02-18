const noteService = require("../../../../lib/note");
const { query } = require("../../../../utils/index");
const defaults = require("../../../../config/defaults");

const findAllItems = async (req, res, next) => {
  const page = req.query.page || defaults.page;
  const limit = req.query.limit || defaults.limit;
  const sortType = req.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const search = req.query.search || defaults.search;

  try {
    const notes = await noteService.findAllItems({
      page,
      limit,
      sortType,
      sortBy,
      search,
    });

    const totalItems = await noteService.count({ search });
    const pagination = query.getPagination({ totalItems, limit, page });

    // response generation

    const links = query.getHATEOASForAllItems({
      url: req.url,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
      page
    });

    const data = query.getTrasformItems({
      items: notes, 
      path: '/notes',
      selection: ['id', 'title', 'description', 'createdAt', 'updatedAt']
    })

    
    console.log("data object is here", data);

    res.status(200).json({
      notes,
      pagination,
      links
    });
  } catch (e) {
    next(e);
  }
};

module.exports = findAllItems;
