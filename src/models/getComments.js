const pool = require('../database/connect')

module.exports = {
    getComments: async (postId) => {
        const comments = await pool.query('SELECT c.*, us.* FROM comments as c left join users as us on c.id_user = us.id_user where id_post = ?',[postId])
        console.log(comments)
        return comments
    },
    
}