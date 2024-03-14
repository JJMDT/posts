const pool = require('../database/connect')

module.exports = {
    recentActivity: async (idUser) => {
         //const top5 = await pool.query('select p.*, c.* from comments as c left join posts as p on p.id_post = c.id_post where c.id_user = ? order by c.created_at desc limit 5 ',[idUser])
         const top5 = await pool.query('SELECT id_post AS posts, "comment" AS activity_type, created_at AS activity_date FROM comments AS c WHERE id_user = ? UNION ALL SELECT id_post AS posts, "post" AS activity_type, created_at AS activity_date FROM posts AS p WHERE id_user = ?  ORDER BY activity_date DESC limit 5',[idUser,idUser])
         console.log(top5)
         return top5
        
    }
}