const pool = require('../database/connect')
const  {getAllPosts} = require('../models/getAllPost')
const dateAndTime = require('date-and-time');



module.exports = {

    new: async (req,res) => {
        res.render('admin/createPost')
    },
    newPost: async (req, res) => {
        const { title, description } = req.body;
        //haciendo console.log(req.user) se ven todas las variables que tiene, usamos req.user.id_user
        const idUser = req.user.id_user
        const newPost = { title, description, id_user:idUser };
       // console.log(req.body);
    
       await pool.query('INSERT INTO posts SET ?', [newPost]);
        console.log('Post creado con exito');
    
        res.redirect('/allPosts');
    },
    // post: async (req,res) => {
    //     const idUser = req.user.id_user
    //     const data = await getAllPosts(idUser)
    //     res.render('post/post',{data,dateAndTime})
    // }
    
}