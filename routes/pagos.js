const router = require('express').Router();
const Pago = require('../models/pago');

router
    .get('/', (req, res, next) => {
        Pago.all( (error, data) => {
            return Pago.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Pago.count( (error, data) => {
            return Pago.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Pago.exist( req.params.id, (error, data) => {
            return Pago.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const pagoId = req.params.id;
        Pago.findById( pagoId, (error, data) => {
            return Pago.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        const pagoId = req.params.id;
        Pago.remove( pagoId, (error, data) => {
            return Pago.response(res, error, data);
        });
    })
    .patch('/', (req, res, next) => {
        const pago = {
            idpago: req.body.idpago,
            subtotal: req.body.subtotal,
            iva: req.body.iva,
            orden_idorden: req.body.orden_idorden,
            facturar: req.body.facturar,
        };
        Pago.update( pago, (error, data) => {
            return Pago.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const pago = {
            idpago: null,
            subtotal: req.body.subtotal,
            iva: req.body.iva,
            orden_idorden: req.body.orden_idorden,
            facturar: req.body.facturar,
        };
        console.log(pago);
        Pago.insert( pago, (error, data) => {
            return Pago.response(res, error, data);
        });
    })

module.exports = router;