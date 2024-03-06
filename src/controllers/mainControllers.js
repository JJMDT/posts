module.exports = {
    home: async(req,res)=>{
        res.render('home')
    },
    contact: async(req,res)=>{
        res.send('vista contact')
    }
}