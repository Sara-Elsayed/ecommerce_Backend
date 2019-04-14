const express = require('express');
const logger = require('morgan');
const cors = require('cors');

require('./db');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products',productsRouter);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500);
    res.send(err);
});
module.exports = app;
