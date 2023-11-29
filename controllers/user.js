const db=require('../models');
const { StatusCodes } = require('http-status-codes');
const User=db.User;
const bcrypt=require('../utils/bcrypt');
const jwt=require('../utils/jwt')
const { BadRequestError, UnauthenticatedError } = require('../errors');
const signUp=async(req,res)=>{
    let {
        username,
        email,
        password,
        mobileNumber
    } = req.body;
    const emailAlreadyExists = await User.findOne({ where: { email } });
     if(emailAlreadyExists){
        throw new BadRequestError('user already exist')
     }
    password = await bcrypt.hashPassword(password);
    console.log(mobileNumber);
    const user = await User.create({ username: username, email: email, password: password, mobileNumber:mobileNumber  });
    res.status(StatusCodes.CREATED).json({
        user: { name: user.username },
        msg: 'signup successful',
    });
    
}
const login=async(req,res)=>{
   const {email,password}=req.body;
   if(!email || !password){
    throw new BadRequestError ('Please provide emal and password ')
   }
   const user= await User.findOne({where:{email}});
   if(!user){
    throw new UnauthenticatedError('Invalid Credentials')
   }
   const isPasswordCorrect = await bcrypt.verifyPassword(
    password,
    user.password
);
if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid password");//compare password
}
const token = jwt.generateAccessToken(user.id);
    res.status(StatusCodes.OK).json({
        user: { name: user.username },
        msg: 'login successful',
        token,
    });
}

module.exports={signUp,login}