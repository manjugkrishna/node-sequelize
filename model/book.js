const mongoose=require('mongoose')

const bookSchema=new mongoose.Schema({
    bookName:{
        type:String,
        required:true
    },
    bookPrice:{
        type:Number,
        required:true
    }
})
module.exports=mongoose.model('Book',bookSchema)