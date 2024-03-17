const pool = require('../database/connect')

module.exports = {
    //esta funcion quedo descartada por un cambio 
    // recentActivity: async (idUser) => {
    //      //const top5 = await pool.query('select p.*, c.* from comments as c left join posts as p on p.id_post = c.id_post where c.id_user = ? order by c.created_at desc limit 5 ',[idUser])
    //      const top5 = await pool.query('SELECT id_post AS posts, "comment" AS activity_type, created_at AS activity_date FROM comments AS c WHERE id_user = ? UNION ALL SELECT id_post AS posts, "post" AS activity_type, created_at AS activity_date FROM posts AS p WHERE id_user = ?  ORDER BY activity_date DESC limit 5',[idUser,idUser])
    //      console.log(top5)
    //      return top5
        
    // },
    activityMostRecent: async(idUser) =>{
        const result = await pool.query('select act.*, p.title from activity_log as act left join posts as p on p.id_post = act.id_post where act.id_user = ? order by created_at desc limit 5  ',[idUser])
        return result
    },
    registerActivity: async (idUser,postId,action)=>{
        const activity = {
            id_user: idUser,
            id_post: postId, //me da el ID del post recien creado
            action: action
          };
          await pool.query("INSERT INTO activity_log SET ?", [activity]);
    }
}