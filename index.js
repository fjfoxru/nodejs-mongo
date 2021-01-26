const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const Password = 'qwe321QWE321';
const Name = 'nodejs-mongo';
const UrlDB = `mongodb+srv://nodejs-mongo-admin:${Password}@cluster0.jsjpu.mongodb.net/${Name}?retryWrites=true&w=majority`

const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');

const indexRouter = require('./routes/index');
const booksApiRouter = require('./routes/api/books');
const booksRouter = require('./routes/books');
// const userRouter = require('./routes/user');

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(loggerMiddleware);

app.use('/files', express.static(__dirname+'/public'));

app.use('/', indexRouter);
app.use('/api/books', booksApiRouter);
app.use('/books', booksRouter);
// app.use('/user', userRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await mongoose.connect(UrlDB);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }}
    start();