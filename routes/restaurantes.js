const router = require('express').Router();
const Restaurante = require('../models/restaurante');

router
    .get('/', (req, res, next) => {
        Restaurante.all( (error, data) => {
            return Restaurante.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Restaurante.count( (error, data) => {
            return Restaurante.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Restaurante.exist( req.params.id, (error, data) => {
            return Restaurante.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const restauranteId = req.params.id;
        Restaurante.findById( restauranteId, (error, data) => {
            return Restaurante.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        const restauranteId = req.params.id;
        Restaurante.remove( restauranteId, (error, data) => {
            return Restaurante.response(res, error, data);
        });
    })
    .patch('/', (req, res, next) => {
        const restaurante = {
            idrestaurante: req.body.idrestaurante,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            tipoComida_idtipoComida: req.body.tipoComida_idtipoComida
        };
        Restaurante.update( restaurante, (error, data) => {
            return Restaurante.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const restaurante = {
            idrestaurante: null,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            tipoComida_idtipoComida: req.body.tipoComida_idtipoComida,
        }
        console.log(restaurante);
        Restaurante.insert( restaurante, (error, data) => {
            return Restaurante.response(res, error, data);
        });
    })
    

module.exports = router;