const {getAllPosts, getPostsForUser} = require('../models/getAllPost')
const {getComments} = require('../models/getComments')
const {recentActivity} = require('../models/activity')
const dateAndTime = require('date-and-time');


module.exports = {
    home: async(req,res)=>{
        const data = await getAllPosts();
        const randomPost = [...data].sort(()=> Math.random()-0.5)

        res.render('home',{data,randomPost,dateAndTime})
    },
    contact: async(req,res)=>{
        res.send('vista contact')
    },
    profile: async (req,res) =>{
        const idUser = req.user.id_user
        console.log(idUser)
        const data = await getPostsForUser(idUser)
        const activity = await recentActivity(idUser)
        res.render('admin/profile',{data,activity,dateAndTime})
    },
    allPosts: async (req,res) => {
        const postId = req.params.id; // trae el ID 
        const data = await getAllPosts();
        const mostRecent = [...data].sort((a,b)=> b.id_post - a.id_post ); // ordena por id, de mayor a menor 

        const dataComment = await getComments(postId)
        console.log(" post id",postId)
        console.log("data de los comentarios",dataComment)
        console.log("todos los post completos ",data)

       // console.log("todos los posts ",data)
        res.render('admin/allposts',{data,mostRecent,dataComment,dateAndTime})
    }
 }