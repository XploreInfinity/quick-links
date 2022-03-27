const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId
const TokenSchema = mongoose.Schema({
    gid:{
        type: String,
        required: true,
        unique: true
    },
    aadhar:{
        type: String,
        required:true,
        unique:true,
        maxlength:12,
        minlength:12
    },
    token:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        index: {expires:'15m'}
    }
}) 
module.exports = mongoose.model('Token',TokenSchema)