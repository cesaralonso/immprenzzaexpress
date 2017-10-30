const router = require('express').Router();
const Checkout = require('../models/checkout');

router
    .get('/', (req, res, next) => {
        Checkout.all( (error, data) => {
            return Checkout.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Checkout.count( (error, data) => {
            return Checkout.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Checkout.exist( req.params.id, (error, data) => {
            return Checkout.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const checkoutId = req.params.id;
        Checkout.findById( checkoutId, (error, data) => {
            return Checkout.response(res, error, data);
        });
    })
    .patch('/', (req, res, next) => {
        const checkout = {
            idCheckout: req.body.idCheckout,
            entrada: req.body.entrada,
            salida: req.body.salida,
            tiempo_trabajado: req.body.tiempo_trabajado,
            Personal_idPersonal: req.body.Personal_idPersonal,
        };
        Checkout.update( checkout, (error, data) => {
            return Checkout.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const checkout = {
            idCheckout: null,
            entrada: req.body.entrada,
            salida: req.body.salida,
            tiempo_trabajado: req.body.tiempo_trabajado,
            Personal_idPersonal: req.body.Personal_idPersonal,
        };
        console.log(checkout);
        Checkout.insert( checkout, (error, data) => {
            return Checkout.response(res, error, data);
        });
    })

module.exports = router;
