// const albumService = require("../../../../lib/album");

// const updateItem = async (req, res, next) => {
//   const { id } = req.params;
  
//   const {
//     artistId,
//     userId,
//     albumType,
//     albumName,
//     albumCover,
//     albumGenre,
//     metadataLanguage,
//     primaryArtist,
//     featuringArtist,
//     originalReleaseDate,
//     recordLabel,
//     plineYear,
//     pline,
//     clineYear,
//     cline,
//     upcean,
//     tracks
//  } = req.body;

//  const albumData = {
//   artistId,
//     userId,
//     albumType,
//     albumName,
//     albumCover,
//     albumGenre,
//     metadataLanguage,
//     primaryArtist,
//     featuringArtist,
//     originalReleaseDate,
//     recordLabel,
//     plineYear,
//     pline,
//     clineYear,
//     cline,
//     upcean,
//     tracks
//  };



//  try {
//    const album = await albumService.updateOrCreate(id, albumData);
//    const response ={
//      code: 200,
//      message: 'Updated successfully',
//      data : album,
//      links:{
//        self: `albums/${album.id}`
//      }
//    }
//    res.status(200).json(response);
//  } catch (e) {
//    next(e);
//  }
// };

// module.exports = updateItem;

const albumService = require("../../../../lib/album");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize upload with multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB limit for file size
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("albumCover"); // Assuming the name of your input field for albumCover is 'albumCover'

// Check file type
function checkFileType(file, cb) {
  // Allowed file extensions
  const filetypes = /jpeg|jpg|png|gif|JPEG|JPG|PNG|GIF/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images only!");
  }
}

const updateItem = async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { id } = req.params;

    const {
      artistId,
      albumType,
      albumName,
      albumGenre,
      metadataLanguage,
      primaryArtist,
      featuringArtist,
      originalReleaseDate,
      recordLabel,
      pLineYear,
      pLine,
      cLineYear,
      cLine,
      upcean,
      tracks,
    } = req.body;

    let albumCover = req.file ? req.file.path : null;

    // Resize the image to desired dimensions
    if (albumCover) {
      try {
        const resizedImagePath = `${albumCover
          .split(".")
          .slice(0, -1)
          .join(".")}_resized.jpg`;

        await sharp(albumCover).resize({ width: 1000, height: 1000 }).toFile(resizedImagePath);

        // Update albumCover to the resized image path
        albumCover = resizedImagePath;
      } catch (error) {
        console.error("Error resizing image:", error);
        return res.status(500).json({ error: "Image resizing failed" });
      }
    }

    const albumData = {
      artistId,
      albumType,
      albumName,
      albumCover,
      albumGenre,
      metadataLanguage,
      primaryArtist,
      featuringArtist,
      originalReleaseDate,
      recordLabel,
      pLineYear,
      pLine,
      cLineYear,
      cLine,
      upcean,
      tracks,
    };

    try {
      const album = await albumService.updateOrCreate(id, albumData);
      const response = {
        code: 200,
        message: "Updated successfully",
        data: album,
        links: {
          self: `albums/${album.id}`,
        },
      };
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  });
};

module.exports = updateItem;