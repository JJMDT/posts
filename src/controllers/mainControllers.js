module.exports = {
    home: async(req,res)=>{
        res.render('home')
    },
    contact: async(req,res)=>{
        res.send('vista contact')
    },
    profile: async (req,res) =>{
        res.render('admin/profile')
    },
    allPosts: async (req,res) => {
        res.send('Aqui van todos los post')
    }
 }