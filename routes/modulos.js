const router = require('express').Router();
const Modulo = require('../models/modulo');

router
    .get('/', (req, res, next) => {
        Modulo.all( (error, data) => {
            return Modulo.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Modulo.count( (error, data) => {
            return Modulo.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Modulo.exist( req.params.id, (error, data) => {
            return Modulo.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const moduloId = req.params.id;
        Modulo.findById( moduloId, (error, data) => {
            return Modulo.response(res, error, data);
        });
    })
    .patch('/', (req, res, next) => {
        const modulo = {
            idModulo: req.body.idModulo,
            nombre: req.body.nombre,
        };
        Modulo.update( modulo, (error, data) => {
            return Modulo.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const modulo = {
            idModulo: null,
            nombre: req.body.nombre,
        };
        console.log(modulo);
        Modulo.insert( modulo, (error, data) => {
            return Modulo.response(res, error, data);
        });
    })

module.exports = router;
