const pool = require('../database/connect');


module.exports = {
    

    getAllPosts : async() =>{
        //const rows = await pool.query('SELECT p.*, u.name FROM posts as p left join users as u on p.id_user = u.id_user ')
        const rows = await pool.query('SELECT p.*,COUNT(c.id_comment) AS commentCount, us.* FROM posts as p left join comments as c on p.id_post = c.id_post LEFT JOIN users as us on p.id_user = us.id_user GROUP BY p.id_post ')
        //console.log(rows)
        return rows
    },
    
    getPostsForUser: async(idUser) => {

        const postsForUser = await pool.query('SELECT * FROM posts WHERE id_user = ?',[idUser])
        //console.log("your posts",postsForUser)
        return postsForUser
    },
    getPost:async (postId) => {
        const post = await pool.query('SELECT p.*, u.* FROM posts as p left join users as u on p.id_user = u.id_user WHERE id_post = ?',[postId])
        //console.log(post)
        return post
    }
}