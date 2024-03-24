
const userService = require("../../../../lib/user");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const updateItem = async (req, res, next) => {
  
    const { id } = req.params;
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.userAgent;
    const email =  req.user.email

    const {
      name,
      role,
      status,
      profilePicture
    } = req.body;

     

    const userData = {
      id,
      name,
      role,
      status,
      profilePicture
    };

    try {
      const user = await userService.updateOrCreate(id, userData, ipAddress, userAgent, email);
      const response = {
        code: 200,
        message: "Updated successfully",
        data: user,
        links: {
          self: `users/${user.id}`,
        },
      };
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }

};

module.exports = updateItem;
