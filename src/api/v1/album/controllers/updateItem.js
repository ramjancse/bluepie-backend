const albumService = require("../../../../lib/album");

const updateItem = async (req, res, next) => {
  const { id } = req.params;
  
  const {
    artistId,
    userId,
    albumType,
    albumName,
    albumCover,
    albumGenre,
    metadataLanguage,
    primaryArtist,
    featuringArtist,
    originalReleaseDate,
    recordLabel,
    plineYear,
    pline,
    clineYear,
    cline,
    upcean,
    tracks
 } = req.body;

 const albumData = {
  artistId,
    userId,
    albumType,
    albumName,
    albumCover,
    albumGenre,
    metadataLanguage,
    primaryArtist,
    featuringArtist,
    originalReleaseDate,
    recordLabel,
    plineYear,
    pline,
    clineYear,
    cline,
    upcean,
    tracks
 };



 try {
   const album = await albumService.updateOrCreate(id, albumData);
   const response ={
     code: 200,
     message: 'Updated successfully',
     data : album,
     links:{
       self: `artists/${album.id}`
     }
   }
   res.status(200).json(response);
 } catch (e) {
   next(e);
 }
};

module.exports = updateItem;
