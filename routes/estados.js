const router = require('express').Router();
const Estado = require('../models/estado');

router
    .get('/', (req, res, next) => {
        Estado.all( (error, data) => {
            return Estado.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Estado.count( (error, data) => {
            return Estado.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Estado.exist( req.params.id, (error, data) => {
            return Estado.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const estadoId = req.params.id;
        Estado.findById( estadoId, (error, data) => {
            return Estado.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        const estadoId = req.params.id;
        Estado.remove( estadoId, (error, data) => {
            return Estado.response(res, error, data);
        });
    })
    .patch('/', (req, res, next) => {
        const estado = {
            idestado: req.body.idestado,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            tipoComida_idtipoComida: req.body.tipoComida_idtipoComida
        };
        Estado.update( estado, (error, data) => {
            return Estado.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const estado = {
            idestado: null,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            tipoComida_idtipoComida: req.body.tipoComida_idtipoComida
        }
        console.log(estado);
        Estado.insert( estado, (error, data) => {
            return Estado.response(res, error, data);
        });
    })

module.exports = router;