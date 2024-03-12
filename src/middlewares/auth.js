module.exports = {

    isLoggedIn: (req,res,next) => {
        if(req.isAuthenticated()){
            return next()
        }else{
            return res.redirect('/auth/login')
        }
    },
   
  isLoggedOut: (req,res,next) => {
        if(req.isAuthenticated()){
            return res.redirect('/profile')
        }else{
            next()
        }
    }
    
}
// isLoggedOut: (req,res,next) => {
//     if(!req.isAuthenticated()){
//         return next() 
//     }else{
//        return res.redirect('/profile')
//     }
// }