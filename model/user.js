const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    bookId:{
        type: mongoose.Types.ObjectId,
        ref: 'Book',
        required: true
    }

})
module.exports=mongoose.model('User',userSchema);