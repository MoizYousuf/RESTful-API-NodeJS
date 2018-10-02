const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Products get method"
    });
});

router.post('/', (req, res, next) => {
    console.log(req.body)
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(201).json({
        message: "Products post method",
        createdProduct: product
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === "special")
        res.status(200).json({
            message: "you discovered special id",
            id: id
        });
    else {
        res.status(200).json({
            message: "you passed Id"
        });
    };
});

router.patch('/:productsId', (req, res, next) => {
    res.status(200).json({
        message: "Your id is now uptodate",
    });
});

router.delete('/:productsId', (req, res, next) => {
    res.status(200).json({
        message: "you are in delete method"
    });
});

module.exports = router;