const labelService = require('../../../../lib/label')

const findSingleItem = async (req, res, next)=>{
    const id = req.params.id;
    const expand = req.query.expand || ''

    try {
        const label = await labelService.findSingleItem(id)
        const response = {
            data: label,
            links:{
                self: `/labels/${label.id}`,
                author: `/labels/${label.id}/author`,
            }
        }
        res.status(200).json(label)
    } catch (e) {
        res.status(500).json({
            error: "Invalid ID",
            message: e.message
          });
    }
}
module.exports = findSingleItem
