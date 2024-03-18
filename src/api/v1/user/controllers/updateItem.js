// const artistService = require("../../../../lib/artist");

// const updateItem = async (req, res, next) => {
//   const { id } = req.params;

//   const {
//      artistType,
//     nameOfType,
//     artistName,
//     fullName,
//     sex,
//     region,
//     artistImage,
//     artistDiscription,
//     artistLinks,
//     socialMedia
//   } = req.body;

//   const userData = {
//     id,
//     artistType,
//     nameOfType,
//     artistName,
//     fullName,
//     sex,
//     region,
//     artistImage,
//     artistDiscription,
//     artistLinks,
//     socialMedia
//   };



//   try {
//     const artist = await artistService.updateOrCreate(id, userData);
//     const response ={
//       code: 200,
//       message: 'Updated successfully',
//       data : artist,
//       links:{
//         self: `artists/${artist.id}`
//       }
//     }
//     res.status(200).json(response);
//   } catch (e) {
//     next(e);
//   }
// };

// module.exports = updateItem;

const userService = require("../../../../lib/user");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

// Set storage engine for multer
// const storage = multer.diskStorage({
//   destination: "./uploads",
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// Initialize upload with multer
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 }, // 1MB limit for file size
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// }).single("artistImage"); // Assuming the name of your input field for artistImage is 'artistImage'

// Check file type
// function checkFileType(file, cb) {
//   // Allowed file extensions
//   const filetypes = /jpeg|jpg|png|gif|JPEG|JPG|PNG|GIF/;
//   // Check extension
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   // Check mime type
//   const mimetype = filetypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb("Error: Images only!");
//   }
// }

const updateItem = async (req, res, next) => {
  
    const { id } = req.params;

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
      const user = await userService.updateOrCreate(id, userData);
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
