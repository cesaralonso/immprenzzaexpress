const router = require('express').Router();
const Enfermedad = require('../models/enfermedad');

router
    .get('/', (req, res, next) => {
        Enfermedad.all( (error, data) => {
            return Enfermedad.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Enfermedad.count( (error, data) => {
            return Enfermedad.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Enfermedad.exist( req.params.id, (error, data) => {
            return Enfermedad.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const enfermedadId = req.params.id;
        Enfermedad.findById( enfermedadId, (error, data) => {
            return Enfermedad.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        const enfermedadId = req.params.id;
        Enfermedad.remove( enfermedadId, (error, data) => {
            return Enfermedad.response(res, error, data);
        });
    })
    .patch('/', (req, res, next) => {
        const enfermedad = {
            idenfermedad: req.body.idenfermedad,
            nombre: req.body.nombre
        };
        Enfermedad.update( enfermedad, (error, data) => {
            return Enfermedad.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const enfermedad = {
            idenfermedad: null,
            nombre: req.body.nombre
        }
        console.log(enfermedad);
        Enfermedad.insert( enfermedad, (error, data) => {
            return Enfermedad.response(res, error, data);
        });
    })

module.exports = router;