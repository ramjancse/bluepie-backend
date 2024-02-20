const artistService = require('../../../../lib/artist')

const findSingleItem = async (req, res, next)=>{
    const id = req.params.id;
    const expand = req.query.expand || ''

    try {
        const artist = await artistService.findSingleItem(id)
        const response = {
            data: artist,
            links:{
                self: `/artists/${artist.id}`,
                author: `/artists/${artist.id}/author`,
            }
        }
        res.status(200).json(artist)
    } catch (e) {
        res.status(500).json({
            error: "Invalid ID",
            message: e.message
          });
    }
}
module.exports = findSingleItem
