const express = require('express');
const app = express();
const productRouter = require('./api/routes/products');
const orderRouter = require('./api/routes/orders');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://MoizYousuf:moizyousuf@nodeshop-hmonh.mongodb.net/test?retryWrites=true", {
    useNewUrlParser: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, PATCH, DELETE");
        return res.status(200).json({});
    };
    next();
});

app.use('/products', productRouter);
app.use('/orders', orderRouter);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    console.error(error);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;