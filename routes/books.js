const express = require('express');
const router = express.Router();
const {Book} = require('../models');



router.get('/', async (request, responce) => {
    const books = await Book.find();
    responce.render("books/index", {
        title: "Книги",
        books: books
    });
});

router.get('/create', (req, res) => {
    res.render("books/create", {
        title: "Создание книги",
        book: {},
    });
});

router.post('/create', async (req, res) => {
    const {title, desc} = req.body;

    const newBook = new Book({
        title: 'qwe',
        desc,
    });
    try {
        await newBook.save();
        res.redirect('/books');
    } catch (e) {
        console.error(e);
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    let book;
    try {
        book = await Book.findById(id);
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }
    res.render("books/view", {
        title: "Просмотр книги",
        book: book,
    });
});

router.get('/update/:id', async (req, res) => {
    const {id} = req.params;
    let book;
    try {
        book = await Book.findById(id);
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }
    res.render("books/update", {
        title: "Обновление книги",
        book: book,
    });
});

router.post('/update/:id', async (req, res) => {
    const {id} = req.params;
    const {title, desc} = req.body;

    try {
        await Book.findByIdAndUpdate(id, {title, desc});
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.redirect(`/books/${id}`);
});

router.post('/delete/:id', async (req, res) => {
    const {id} = req.params;
    try {
        await Book.deleteOne({_id: id});
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }
    res.redirect(`/books`);
});

module.exports = router;