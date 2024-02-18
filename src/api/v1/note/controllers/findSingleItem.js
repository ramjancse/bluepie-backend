const noteService = require('../../../../lib/note')

const findSingleItem = async (req, res, next)=>{
    console.log('all req->>>', req.params);
    const id = req.params.id;
    const expand = req.query.expand || ''

    try {
        const note = await noteService.findSingleItem(id)
        const response = {
            data: note,
            links:{
                self: `/notes/${note.id}`,
                author: `/notes/${note.id}/author`,
            }
        }
        res.status(200).json(note)
    } catch (e) {
        next(e)
    }
}
module.exports = findSingleItem
