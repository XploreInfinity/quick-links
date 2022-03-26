const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieParser=require('cookie-parser')
const loginRoute=require('./routes/login')
const checkAuthenticated = require('./middlewares/checkAuthenticated')
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
app.use('/login',loginRoute)

app.get('/',checkAuthenticated,(req,res)=>{
    let user=req.user
    res.render('index',{user})
})
app.get('/logout',(req,res)=>{
    //clear the session cookie:
    res.clearCookie('session-token')
    res.redirect('/login')
})
//Connect to the DB:
mongoose.connect(db_url,()=>{
    console.log('Connected to DB!')
})
//make the app listen on a port:
app.listen(port)
console.log(`App running at http://localhost:${port}`)