const db=require('../models');
const Book=db.Book;
const User=db.User;
const { StatusCodes } = require('http-status-codes');
const {NotFoundError}=require ('../errors') ;

const getAllBooks=async(req,res)=>{
    const book=await Book.findAll({
        include:[{ model:User}]
    })
    res.status(StatusCodes.OK).json({data:book});
}

const addBook=async(req,res)=>{
    const userId=req.user.userId
    console.log(userId);
  const book=await Book.create({
    bookname:req.body.bookname,
    bookPrice:req.body.bookPrice,
    bookAuthor:req.body.bookAuthor,
    userId:userId
  });
  res.status(StatusCodes.CREATED).json({book}); 
}
 const updateBook=async(req,res)=>{
    const{
        params:{id:id}
    }=req;
    const book=await Book.update(req.body,{where:{ id :id}});
    if(!book){
        throw new NotFoundError(`No product with id ${id}`);
    }
    const updatedbook= await Book.findOne({where:{id:id}});
    res.status(StatusCodes.OK).json({message:"updated",updatedbook})
 }

 const deleteBook=async(req,res)=>{
    const{
        params:{id:id}
    }=req;
    const book=await Book.destroy({where:{ id :id}});
    if(!book){
        throw new NotFoundError(`No product with id ${id}`);
    }
    res.status(StatusCodes.OK).json({book})
 }

module.exports={
    getAllBooks,
    addBook,
    updateBook,
    deleteBook
}