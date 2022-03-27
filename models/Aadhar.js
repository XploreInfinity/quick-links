const mongoose=require('mongoose');
const AadharSchema = mongoose.Schema({
    card_num:{
        type: String,
        required:true,
        unique:true,
        minLength:12,
        maxLength:12
    },
    fname:{
        type:String,
        required:true
    },
    mname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    age_band:{
        type:String,
    },
    state:{
        type: String,
        Max: 25
    },
    mobile:{//a mobile no. can be linked to multiple aadhar cards,so might not be unique
        type: String,
        required:true,
        Max:10 //excluding country code for obvious reasons
    },
    //it is mandatory to link mobile no to aadhar card,so email is more of an optional field,but we'll keep it anyway:
    email:{
        type: String,
        unique:true
    }
})
module.exports =mongoose.model('Aadhar',AadharSchema)