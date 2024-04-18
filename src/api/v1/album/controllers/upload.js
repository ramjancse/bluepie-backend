const albumService = require("../../../../lib/album");
const Album = require("../../../../model/Album");
const multer = require("multer");
const xlsx = require("xlsx");
const ExcelJS = require("exceljs");
const fs = require("fs");

const upload = async (req, res, next) => {
  const jsonData = req.body;

  try {
    const workbook = require("xlsx").readFile(req.file.path);

    const sheetName = workbook.SheetNames[0]; // First sheet
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet); // Convert worksheet to JSON

    // Insert each row of data into MongoDB
    for (const row of data) {
      let tracks = [];

      for (let i = 1; i <= 20; i++) {
        if (!row[`trackTitle${i}`]) break;

        const track = {
          trackTitle: row[`trackTitle${i}`],
          trackArtist: [{ name: row[`trackArtist${i}`] }],
          lyricist: [{ name: row[`lyricist${i}`] }],
          composer: [{ name: row[`composer${i}`] }],
          producer: [{ name: row[`producer${i}`] }],
          duration: row[`duration${i}`],
          isrc: row[`isrc${i}`],
          trackVersion: row[`trackVersion${i}`],
          
        };
        tracks.push(track);
      }

      let dataForInsert = {
        releaseTitle: row.releaseTitle,
        status: row.status,
        releaseVersion: row.releaseVersion,
        releasePrimaryArtist: [{ name: row.releasePrimaryArtist }],
        digitalReleaseDate: row.digitalReleaseDate,
        originalReleaseDate: row.originalReleaseDate,
        upcean: row.upcean,
        tracks: tracks,
      };

      const finalData = new Album(dataForInsert);
      await finalData.save();
    }

    res.json({ message: "Data uploaded successfully!" });
  } catch (error) {
    
    res.status(500).json(error);
  }
};

module.exports = upload;
