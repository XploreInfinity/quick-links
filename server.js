const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieParser=require('cookie-parser')
const authRoute=require('./routes/auth')
const aadharRoute=require('./routes/aadhar')
const checkAuthenticated = require('./middlewares/checkAuthenticated')
const User = require('./models/User')
dotenv.config({path:'./.env'})
app = express()
const port = process.env.PORT || 8000
const db_url = process.env.DB_URL

//Middlewares:
//View-engine:
app.set('view engine','ejs')
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
//Routes:
app.use('/',authRoute)
app.use('/aadharlink',aadharRoute)
app.get('/',checkAuthenticated,async(req,res)=>{
    let user = req.user
    const verifiedUser =await User.findOne({gid:user.sub})
    res.render('index',{user,verifiedUser})
})
//Connect to the DB:
mongoose.connect(db_url,()=>{
    console.log('Connected to DB!')
})
//make the app listen on a port:
app.listen(port)
console.log(`App running at http://localhost:${port}`)