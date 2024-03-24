const artistService = require('../../../../lib/artist')

const findSingleItem = async (req, res, next)=>{
    const id = req.params.id;
    const expand = req.query.expand || ''
    const email =  req.user.email
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.userAgent;
  

    try {
        const artist = await artistService.findSingleItem(id,email, ipAddress, userAgent)
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
