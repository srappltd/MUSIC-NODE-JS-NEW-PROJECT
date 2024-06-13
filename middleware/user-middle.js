const Logout = (req,res,next)=>{
    try {
        if(req.session.user){

        }else{
            res.redirect('/')
        }
        next()
    } catch (error) {
        console.log(error)
    }
}
const Login = (req,res,next)=>{
    try {
        if(req.session.user){
            res.redirect('/deshboard')
        }else{
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = {Login, Logout}