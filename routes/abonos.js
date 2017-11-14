const router = require('express').Router();
const Abono = require('../models/abono');
const passport = require('passport');

router
    .get('/', (req, res, next) => {
        Abono.all( (error, data) => {
            return Abono.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Abono.count( (error, data) => {
            return Abono.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Abono.exist( req.params.id, (error, data) => {
            return Abono.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const abonoId = req.params.id;
        Abono.findById( abonoId, (error, data) => {
            return Abono.response(res, error, data);
        });
    })

    .delete('/:id', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        const abonoId = req.params.id;
        Abono.logicRemove( abonoId, (error, data) => {
            return Abono.response(res, error, data);
        });
    })(req, res, next);
})

    .patch('/', (req, res, next) => {
        const abono = {
            idAbono: req.body.idAbono,
            cantidadAbonada: req.body.cantidadAbonada,
            fecha: req.body.fecha,
            cantidadRestante: req.body.cantidadRestante,
            Orden_idOrden: req.body.Orden_idOrden,
        };
        Abono.update( abono, (error, data) => {
            return Abono.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const abono = {
            idAbono: null,
            cantidadAbonada: req.body.cantidadAbonada,
            fecha: req.body.fecha,
            cantidadRestante: req.body.cantidadRestante,
            Orden_idOrden: req.body.Orden_idOrden,
            baja: false
          };
        console.log(abono);
        Abono.insert( abono, (error, data) => {
            return Abono.response(res, error, data);
        });
    })

module.exports = router;
