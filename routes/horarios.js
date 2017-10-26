const router = require('express').Router();
const Horario = require('../models/horario');

router
    .get('/', (req, res, next) => {
        Horario.all( (error, data) => {
            return Horario.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Horario.count( (error, data) => {
            return Horario.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Horario.exist( req.params.id, (error, data) => {
            return Horario.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const horarioId = req.params.id;
        Horario.findById( horarioId, (error, data) => {
            return Horario.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        const horarioId = req.params.id;
        Horario.remove( horarioId, (error, data) => {
            return Horario.response(res, error, data);
        });
    })
    .patch('/', (req, res, next) => {
        const horario = {
            idhorario: req.body.idhorario,
            hora_ini: req.body.hora_ini,
            hora_fin: req.body.hora_fin,
            semana_idsemana: req.body.semana_idsemana
        };
        Horario.update( horario, (error, data) => {
            return Horario.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const horario = {
            idhorario: null,
            hora_ini: req.body.hora_ini,
            hora_fin: req.body.hora_fin,
            semana_idsemana: req.body.semana_idsemana
        };
        console.log(horario);
        Horario.insert( horario, (error, data) => {
            return Horario.response(res, error, data);
        });
    })

module.exports = router;