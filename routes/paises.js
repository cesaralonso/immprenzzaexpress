const router = require('express').Router();
const Pais = require('../models/pais');

router
    .get('/', (req, res, next) => {
        Pais.all( (error, data) => {
            return Pais.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Pais.count( (error, data) => {
            return Pais.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Pais.exist( req.params.id, (error, data) => {
            return Pais.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const paisId = req.params.id;
        Pais.findById( paisId, (error, data) => {
            return Pais.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        const paisId = req.params.id;
        Pais.remove( paisId, (error, data) => {
            return Pais.response(res, error, data);
        });
    })
    .patch('/', (req, res, next) => {
        const pais = {
            idpais: req.body.idpais,
            nombre: req.body.nombre,
            abreviacion: req.body.abreviacion,
        };
        Pais.update( pais, (error, data) => {
            return Pais.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const pais = {
            idpais: null,
            nombre: req.body.nombre,
            abreviacion: req.body.abreviacion,
        };
        console.log(pais);
        Pais.insert( pais, (error, data) => {
            return Pais.response(res, error, data);
        });
    })

module.exports = router;