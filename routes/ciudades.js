const router = require('express').Router();
const Ciudad = require('../models/ciudad');

router
    .get('/', (req, res, next) => {
        Ciudad.all( (error, data) => {
            return Ciudad.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Ciudad.count( (error, data) => {
            return Ciudad.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Ciudad.exist( req.params.id, (error, data) => {
            return Ciudad.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const ciudadId = req.params.id;
        Ciudad.findById( ciudadId, (error, data) => {
            return Ciudad.response(res, error, data);
        });
    })
    .patch('/', (req, res, next) => {
        const ciudad = {
            idciudad: req.body.idciudad,
            nombre: req.body.nombre,
            abreviacion: req.body.abreviacion,
            estado_idestado: req.body.estado_idestado,
        };
        Ciudad.update( ciudad, (error, data) => {
            return Ciudad.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const ciudad = {
            idciudad: null,
            nombre: req.body.nombre,
            abreviacion: req.body.abreviacion,
            estado_idestado: req.body.estado_idestado,
        };
        console.log(ciudad);
        Ciudad.insert( ciudad, (error, data) => {
            return Ciudad.response(res, error, data);
        });
    })

module.exports = router;