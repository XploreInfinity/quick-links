const express=require('express')
const dotenv=require('dotenv')
dotenv.config({path:'../.env'})
const router=express.Router()
const verifyToken=require('../utils/verifyToken')
router.get('/',(req,res)=>{
    res.render('login')
})

router.post('/',async(req,res)=>{
    try{
        const token=req.body.token
        const verification=await verifyToken(token)
        if(verification.status==200){
            res.cookie('session-token',token)
            res.sendStatus(200)
        }
        else
            res.status(400).json({error:"Bad Request"}) 
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error:"Server error"})
    }
})
module.exports=router
