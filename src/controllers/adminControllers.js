const pool = require("../database/connect");
const {
  getAllPosts,
  getPostsForUser,
  getEditPost,
} = require("../models/getAllPost");
const {registerActivity} = require('../models/activity')
const {deleteComments} = require('../models/getComments')
const { deletePost } = require("../models/deletePost");
const { update } = require("../models/updatePost");
const dateAndTime = require("date-and-time");

module.exports = {
  new: async (req, res) => {
    res.render("admin/createPost");
  },
  newPost: async (req, res) => {
    const { title, description } = req.body;
    //haciendo console.log(req.user) se ven todas las variables que tiene, usamos req.user.id_user
    const idUser = req.user.id_user;
    const newPost = { title, description, id_user: idUser };

    // console.log(req.body);

    const resultCreatePost = await pool.query("INSERT INTO posts SET ?", [
      newPost,
    ]);
    const activity = {
      id_user: idUser,
      id_post: resultCreatePost.insertId, //me da el ID del post recien creado
      action: "created post",
    };
    await pool.query("INSERT INTO activity_log SET ?", [activity]);
    console.log("Post creado con exito");
    console.log("activity: ",activity);

    res.redirect("/profile");
  },
  editPostView: async (req, res) => {
    const postId = req.params.id;
    const dataPost = await getEditPost(postId);
    // console.log("lo que contiene", dataPost[0]);
    // usar render y pasar datapost para visualizar en editPost.ejs

    res.render("admin/editPost", { dataPost: dataPost[0] });
  },
  editPost: async (req, res) => {
    const postId = req.params.id;
    const idUser = req.user.id_user
    const post = {
      title: req.body.title,
      description: req.body.description,
    };
    // console.log(post);
    await update(postId, post); // primero pasamos los campos a editar y luego el id
    await registerActivity(idUser,postId,'edit post')
    res.redirect(`/post/${postId}`);
  },
  deletePost: async (req, res) => {
    const postId = req.params.id;
    const idUser = req.user.id_user
    // await deletePost(postId);
    // await registerActivity(idUser,postId,'delete post')
    await deleteComments(postId);
    
    // Eliminar el post
    await deletePost(postId);
    
    // Registrar la actividad asociada con la eliminación del post
    await registerActivity(idUser, postId, 'deleted post');
    res.redirect("/profile");
  },
};
