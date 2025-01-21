const pool = require('../database/connect')
const {deleteComments} = require('../models/getComments')

module.exports = {
    deletePost: async (postId) => {
       // await deleteComments(postId)
        const result = await pool.query('UPDATE  posts  SET deleted = true where id_post = ?', [postId])
        return result
    }
}