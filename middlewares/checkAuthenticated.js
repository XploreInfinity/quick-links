const verifyToken=require('../utils/verifyToken')
const checkAuthenticated=async(req, res, next)=>{

    let token = req.cookies['session-token'];
    let user = {};
    try {
        const verification = await verifyToken(token)
        if(verification.status==200){
            //get the details of the user:
            user.name = verification.payload.name
            user.email = verification.payload.email
            user.picture = verification.payload.picture
            //set the details of the user:
            req.user=user
            next();
        }
        else{
            res.redirect('/login')
        }
    } catch (error) {
        res.redirect('/login')
        console.log(error)
    }
}
module.exports =checkAuthenticated