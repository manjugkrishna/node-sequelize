const express=require ('express');
const app=express();
require ('dotenv').config();
const db = require('./models')
const authenticateUser = require('./middleware/authentication');

const userRouter = require('./routes/user');
const bookRouter=require ('./routes/book');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());


app.use('/api/v1/', userRouter);
app.use('/api/v1/books',authenticateUser,bookRouter);


//middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

db.sequelize
    .sync()
    .then(() => {
        console.log("synced db");
    })
    .catch((err) => {
        console.log("failed" + err.message);
    });

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is listening on ${port}...`);
});