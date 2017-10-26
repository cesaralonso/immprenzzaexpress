const router = require('express').Router();
const TipoComida = require('../models/tipoComida');

router
    .get('/', (req, res, next) => {
        TipoComida.all( (error, data) => {
            return TipoComida.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        TipoComida.count( (error, data) => {
            return TipoComida.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        TipoComida.exist( req.params.id, (error, data) => {
            return TipoComida.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const tipoComidaId = req.params.id;
        TipoComida.findById( tipoComidaId, (error, data) => {
            return TipoComida.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        const tipoComidaId = req.params.id;
        TipoComida.remove( tipoComidaId, (error, data) => {
            return TipoComida.response(res, error, data);
        });
    })
    .patch('/', (req, res, next) => {
        const tipoComida = {
            idtipoComida: req.body.idtipoComida,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            region: req.body.region
        };
        TipoComida.update( tipoComida, (error, data) => {
            return TipoComida.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const tipoComida = {
            idtipoComida: null,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            region: req.body.region
        }
        console.log(tipoComida);
        TipoComida.insert( tipoComida, (error, data) => {
            return TipoComida.response(res, error, data);
        });
    })

module.exports = router;