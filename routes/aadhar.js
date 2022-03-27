const express=require('express')
const checkAuthenticated = require('../middlewares/checkAuthenticated')
const router = express.Router()
const User = require('../models/User')
const Aadhar = require('../models/Aadhar')
const Token = require('../models/Token')
const otpgen = require('otp-generator')
const fast2sms = require('fast-two-sms')
const dotenv = require('dotenv')
dotenv.config({path:'.env'})

router.get('/',checkAuthenticated,async (req,res)=>{
    let user = req.user
    const verified =await User.exists({gid:user.sub})
    res.render('aadharlink',{user,verified})
})
//Route that checks aadhar card and sends OTP if found valid
router.post('/aadhar',checkAuthenticated,async(req,res)=>{
    try {
        const user=req.user
        console.log(req.body.aadhar)
        const aadhar_record =await Aadhar.findOne({card_num:req.body.aadhar})
        if(aadhar_record){
            const mobile=aadhar_record.mobile
            const otp = otpgen.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false})
            const hidden_mob= mobile.slice(0, 2) + mobile.slice(2).replace(/.(?=...)/g, '*')
            console.log(hidden_mob)
            //store otp in tokens collection:(it expires automatically in 15mins)
            const token={
                gid:user.sub,
                aadhar:req.body.aadhar,
                token:otp
            }
            const newToken = await new Token(token)
            const saveToken = await newToken.save()
            //Now send a message with the OTP 
            const msg = "Hi "+user.given_name+"! Your OTP for linking your Google account with your Aadhar card is "+otp+". Valid upto 15 mins."
            const sendMsg= await fast2sms.sendMessage({authorization:process.env.F2SMS_KEY,message:msg,numbers:[mobile]})
            console.log(msg)
            return res.status(200).json({mobile:hidden_mob})
        }
        else{
        return res.status(404).json({error:'This aadhar number does not exist'})
        }    
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Oops! A server error occurred!'})
    }
    
})
//Route that checks OTP-if found valid,it completes the linking process 
router.post('/otp',checkAuthenticated,async(req,res)=>{
 //check otp,with gid
 //if correct,add aadhar to gid
 //done!!
    try {
        let user = req.user
        const otp = req.body.otp
        if(otp){
            const token = await Token.findOne({token:otp,gid:user.sub})
            if(token){
                const usrdat={
                    gid : user.sub,
                    aadhar : token.aadhar
                }
                const newuser = new User(usrdat)
                const saveuser = await newuser.save()
                await Token.deleteOne(token)
                return res.sendStatus(200)
            }else return res.status(409).json({error:"Invalid OTP"})
        }else return res.status(400).json({error:"Bad Request"})
    } catch (error) {
        return res.status(500).json({error:'Oops! A server error occurred!'})
    }
})
module.exports = router