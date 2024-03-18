const userService = require('../../../../lib/user')

const findSingleItem = async (req, res, next)=>{
    const id = req.params.id;
    const expand = req.query.expand || ''

    try {
        const user = await userService.findSingleItem(id)
        const response = {
            data: user,
            links:{
                self: `/users/${user.id}`,
                author: `/users/${user.id}/author`,
            }
        }
        res.status(200).json(user)
    } catch (e) {
        res.status(500).json({
            error: "Invalid ID",
            message: e.message
          });
    }
}
module.exports = findSingleItem
