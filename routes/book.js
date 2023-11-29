const express = require('express');
const router = express.Router();


const {
    getAllBooks,
    addBook,
    updateBook,
    deleteBook
} = require('../controllers/book');

router
    .route('/')
    .post(addBook)
    .get(getAllBooks);

router.route('/:id').delete(deleteBook).patch(updateBook);

module.exports = router;