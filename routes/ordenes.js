const router = require('express').Router();
const Orden = require('../models/orden');

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
        const ordenId = req.params.id;
        Orden.remove( ordenId, (error, data) => {
            return Orden.response(res, error, data);
        });
    })
    .patch('/', (req, res, next) => {
        const orden = {
            idorden: req.body.idorden,
            user_iduser: req.body.user_iduser,
            horaSolicitado: req.body.horaSolicitado,
            direccion_iddireccion: req.body.direccion_iddireccion,
            status: req.body.status
        };
        Orden.update( orden, (error, data) => {
            return Orden.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const orden = {
            idorden: null,
            user_iduser: req.body.user_iduser,
            horaSolicitado: req.body.horaSolicitado,
            direccion_iddireccion: req.body.direccion_iddireccion,
            status: req.body.status
        };
        console.log(orden);
        Orden.insert( orden, (error, data) => {
            return Orden.response(res, error, data);
        });
    })

module.exports = router;