const adminLogout = (req,res,next)=>{
    try {
        if(req.session.admin){

        }else{
            res.redirect('/admin')
        }
        next()
    } catch (error) {
        console.log(error)
    }
}
const adminLogin = (req,res,next)=>{
    try {
        if(req.session.admin){
            res.redirect('/admin/admin-deshboard')
        }else{
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = {adminLogout, adminLogin}