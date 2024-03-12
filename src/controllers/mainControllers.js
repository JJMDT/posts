const {getAllPosts, getPostsForUser} = require('../models/getAllPost')
const {getComments} = require('../models/getComments')
const dateAndTime = require('date-and-time');


module.exports = {
    home: async(req,res)=>{
        const data = await getAllPosts();

        res.render('home',{data})
    },
    contact: async(req,res)=>{
        res.send('vista contact')
    },
    profile: async (req,res) =>{
        const idUser = req.user.id_user
      //  console.log(idUser)
        const data = await getPostsForUser(idUser)
        res.render('admin/profile',{data,dateAndTime})
    },
    allPosts: async (req,res) => {
        const postId = req.params.id; // trae el ID 
        const data = await getAllPosts();
        const dataComment = await getComments(postId)
        console.log(" post id",postId)
        console.log("data de los comentarios",dataComment)
        console.log("todos los post completos ",data)

       // console.log("todos los posts ",data)
        res.render('admin/allposts',{data,dataComment,dateAndTime})
    }
 }