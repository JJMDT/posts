const { getAllPosts, getPostsForUser, getPost } = require("../models/getAllPost");
const {recentActivity,activityMostRecent,registerActivity} = require('../models/activity')
const { getComments } = require("../models/getComments");
const dateAndTime = require('date-and-time');
const pool = require('../database/connect')

//vista /post
module.exports = {
  post: async (req, res) => {
      const postId = req.params.id; // trae el ID 
      const data =await getPost(postId)
      const dataComment = await getComments(postId)
    res.render('post/post',{data,dataComment,dateAndTime})
  },
  addComment: async(req,res) =>{
    const postId = req.params.id;
    const idUser = req.user.id_user

    const {user,comment}= req.body
   // console.log(user)
   // console.log(comment)
   // console.log(req.body)
    const newComment = {
      comment,
      id_post:postId,
      id_user:user,
    }
    // recibo todos los datos del body ahora tengo que insertar los datos en la bbdd tabla comment
    await pool.query('INSERT INTO comments SET ?', [newComment])
    await registerActivity(idUser,postId,'commented post')
    //console.log(newComment)
    res.redirect(`/post/${postId}`)
  }
};
