const router = require('express').Router();
const Semana = require('../models/semana');

router
    .get('/', (req, res, next) => {
        Semana.all( (error, data) => {
            return Semana.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Semana.count( (error, data) => {
            return Semana.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Semana.exist( req.params.id, (error, data) => {
            return Semana.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const semanaId = req.params.id;
        Semana.findById( semanaId, (error, data) => {
            return Semana.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        const semanaId = req.params.id;
        Semana.remove( semanaId, (error, data) => {
            return Semana.response(res, error, data);
        });
    })
    .patch('/', (req, res, next) => {
        const semana = {
            idsemana: req.body.idsemana
        };
        Semana.update( semana, (error, data) => {
            return Semana.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const semana = {
            idsemana: null
        }
        console.log(semana);
        Semana.insert( semana, (error, data) => {
            return Semana.response(res, error, data);
        });
    })

module.exports = router;