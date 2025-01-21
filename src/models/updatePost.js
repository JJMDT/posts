const pool = require('../database/connect')

module.exports = {
    update: async(postId,post) => {
        const result = await pool.query('UPDATE posts SET ? where id_post = ?',[post,postId])
        console.log('resultado de update: ',result)
        return result
    }
}