const albumService = require("../../../../lib/album");
const { query } = require("../../../../utils/index");
const defaults = require("../../../../config/defaults");

const findAllItems = async (req, res, next) => {
  const page = req.query.page || defaults.page;
  const limit = req.query.limit || defaults.limit;
  const sortType = req.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const search = req.query.search || defaults.search;
  const email = req.user.email;
  const ipAddress = req.ip || req.connection.remoteAddress;
  const userAgent = req.userAgent;
  try {
    const artists = await albumService.findAllItems({
      page,
      limit,
      sortType,
      sortBy,
      search,
      email,
      ipAddress,
      userAgent,
    });

    const totalItems = await albumService.count({ search });
    const pagination = query.getPagination({ totalItems, limit, page });

    // // response generation

    const links = query.getHATEOASForAllItems({
      url: req.url,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
      page,
    });

    const data = query.getTrasformItems({
      items: artists,
      path: "/artists",
      selection: ["id", "albumName", "createdAt", "updatedAt"],
    });

    res.status(200).json({
      Message: "OK",
      Status: 200,
      data: artists,
      pagination,
      links,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = findAllItems;
