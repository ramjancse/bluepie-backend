const defaults = require("../config/defaults");
const { generateQueryString } = require("./qs");
const Album = require("../model/Album");


const getPagination = (
  totalItems,
  limit,
  page // Default page to 1 if not provided
) => {
 
  const totalPages = Math.ceil( totalItems / limit); // Calculate total pages

  const pagination = {
    totalItems,
    totalPages,
    currentPage: page,
    limit,
  };

  if (page < totalPages) {
    pagination.nextPage = page + 1;
  }

  if (page > 1) {
    pagination.prevPage = page - 1;
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
