const albumService = require('../../../../lib/album')

const findSingleItem = async (req, res, next)=>{
    const id = req.params.id;
    const expand = req.query.expand || ''

    try {
        const album = await albumService.findSingleItem(id)
        const response = {
            data: album,
            links:{
                self: `/albums/${album.id}`,
                author: `/albums/${album.id}/author`,
            }
        }
        res.status(200).json(album)
    } catch (e) {
        res.status(500).json({
            error: "Invalid ID",
            message: e.message
          });
    }
}
module.exports = findSingleItem
