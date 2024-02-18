const defaults = require("../config/defaults");
const { generateQueryString } = require("./qs");

const getPagination = (
  totalItems = defaults.totalItems,
  limit = defaults.limit,
  page = defaults.page
) => {
  const totalPage = (6 / 2);
  console.log('totalItems', totalItems);
  console.log("total page", typeof(totalPage), totalPage);
  console.log("total page int", typeof(parseInt(totalPage)), totalPage);
  const pagination = {
    page,
    limit,
    totalItems,
    totalPage,
  };
  console.log("pagination", pagination);
  if (page < totalPage) {
    pagination.next = page + 1;
  }

  if (page > 1) {
    pagination.prev = page - 1;
  }

  return pagination;
};

const getHATEOASForAllItems = ({
  url = "/",
  hasNext = false,
  hasPrev = false,
  page = 1,
  path = "",
  query = {},
}) => {
  const links = {
    self: url,
  };

  if (hasNext) {
    const queryStr = generateQueryString({ ...query, page: page + 1 });
    links.next = `${path}?${queryStr}`;
  }

  if (hasPrev) {
    const queryStr = generateQueryString({ ...query, page: page - 1 });
    links.prev = `${path}?${queryStr}`;
  }

  return links;
};

const getTrasformItems = ({ items = [], selection = [], path = "/" }) => {
  if (!Array.isArray(items) || !Array.isArray(selection)) {
    throw new Error("Invalid arguments");
  }

  if (selection.length === 0) {
    return items.map((item) => ({ ...item, link: `${path}/${item.id}` }));
  }
  return items.map((item) => {
    const result = {};
    selection.forEach((key) => {
      result[key] = item[key];
    });
    result.link = `${path}/${item.id}`;
    return result;
  });
};

module.exports = { getPagination, getHATEOASForAllItems, getTrasformItems };
