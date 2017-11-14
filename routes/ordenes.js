const router = require('express').Router();
const Orden = require('../models/orden');
const passport = require('passport');

router
    .get('/', (req, res, next) => {
        Orden.all( (error, data) => {
            return Orden.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Orden.count( (error, data) => {
            return Orden.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Orden.exist( req.params.id, (error, data) => {
            return Orden.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const ordenId = req.params.id;
        Orden.findById( ordenId, (error, data) => {
            return Orden.response(res, error, data);
        });
    })

    .delete('/:id', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        const ordenId = req.params.id;
        Orden.logicRemove( ordenId, (error, data) => {
            return Orden.response(res, error, data);
        });
    })(req, res, next);
})

    .patch('/', (req, res, next) => {
        const orden = {
            idOrden: req.body.idOrden,
            factura: req.body.factura,
            fecha: req.body.fecha,
            status_avance: req.body.status_avance,
            status_pago: req.body.status_pago,
            subtotal: req.body.subtotal,
            total: req.body.total,
            iva: req.body.iva,
            deuda: req.body.deuda,
            f_limite: req.body.f_limite,
            Cliente_idCliente: req.body.Cliente_idCliente,
            };

        Orden.update( orden, (error, data) => {
            return Orden.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const orden = {
            idOrden: null,
            factura: req.body.factura,
            fecha: req.body.fecha,
            status_avance: req.body.status_avance,
            status_pago: req.body.status_pago,
            subtotal: req.body.subtotal,
            total: req.body.total,
            iva: req.body.iva,
            deuda: req.body.deuda,
            f_limite: req.body.f_limite,
            Cliente_idCliente: req.body.Cliente_idCliente,
            baja: false
        };
        console.log(orden);
        Orden.insert( orden, (error, data) => {
            return Orden.response(res, error, data);
        });
    })

module.exports = router;
