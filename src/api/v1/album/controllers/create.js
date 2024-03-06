const albumService = require("../../../../lib/album");
const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");

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

const create = async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    // Extract other fields from req.body
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
      author,
    } = req.body;

    // Check if albumCover field is present in req.file
    let albumCover = req.file ? req.file.path : '';

    // Resize the image to 1000x1000px
    if (albumCover) {
      try {
        const resizedImagePath = `${albumCover
          .split(".")
          .slice(0, -1)
          .join(".")}_resized.jpg`;
        console.log("Original image path:", albumCover);
        console.log("Resized image path:", resizedImagePath);

        await sharp(albumCover).resize(1000, 1000).toFile(resizedImagePath);

        // Delete the original image after resizing

        // fs.unlinkSync(albumCover); // Deleting original image

        albumCover = resizedImagePath;
      } catch (error) {
        console.error("Error resizing image:", error);
        return res.status(500).json({ error: "Image resizing failed" });
      }
    }

    try {
      const album = await albumService.create({
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
        author: req.user.id,
      });

      const response = {
        code: 201,
        message: "Created Successfully",
        data: { ...album },
        links: {
          self: `/albums/${album.id}`,
          author: `/albums/${album.id}/author`,
        },
      };

      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  });
};

module.exports = create;