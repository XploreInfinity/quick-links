const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    gid:{
        type: String,
        required: true,
        unique: true
    },
    aadhar:{
        type:String,
        minLength:12,
        maxLength:12,
        required:true,
        unique:true
    }//TODO: MAYBE ADD ADDITIONAL IDENTIFYING INFORMATION
})
module.exports= mongoose.model('User',UserSchema)