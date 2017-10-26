const router = require('express').Router();
const Factura = require('../models/factura');

router
    .get('/', (req, res, next) => {
        Factura.all( (error, data) => {
            return Factura.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Factura.count( (error, data) => {
            return Factura.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Factura.exist( req.params.id, (error, data) => {
            return Factura.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const facturaId = req.params.id;
        Factura.findById( facturaId, (error, data) => {
            return Factura.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        const facturaId = req.params.id;
        Factura.remove( facturaId, (error, data) => {
            return Factura.response(res, error, data);
        });
    })
    .patch('/', (req, res, next) => {
        const factura = {
            idfactura: req.body.idfactura,
            rfc: req.body.rfc,
            cadena: req.body.cadena,
            fecha: req.body.fecha,
            direccion_iddireccion: req.body.direccion_iddireccion,
            pago_idpago: req.body.pago_idpago,
        };
        Factura.update( factura, (error, data) => {
            return Factura.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const factura = {
            idfactura: null,
            rfc: req.body.rfc,
            cadena: req.body.cadena,
            fecha: req.body.fecha,
            direccion_iddireccion: req.body.direccion_iddireccion,
            pago_idpago: req.body.pago_idpago,
        };
        console.log(factura);
        Factura.insert( factura, (error, data) => {
            return Factura.response(res, error, data);
        });
    })

module.exports = router;