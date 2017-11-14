const router = require('express').Router();
const Puesto = require('../models/puesto');
const passport = require('passport');




router
    .get('/', (req, res, next) => {
        Puesto.all( (error, data) => {
            return Puesto.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Puesto.count( (error, data) => {
            return Puesto.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Puesto.exist( req.params.id, (error, data) => {
            return Puesto.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const puestoId = req.params.id;
        Puesto.findById( puestoId, (error, data) => {
            return Puesto.response(res, error, data);
        });
    })

    .delete('/:id', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        const puestoId = req.params.id;
        Puesto.logicRemove( puestoId, (error, data) => {
            return Puesto.response(res, error, data);
        });
    })(req, res, next);
})

    .patch('/', (req, res, next) => {
        const puesto = {
            idPuesto: req.body.idPuesto,
            nombre: req.body.nombre,
        };
        Puesto.update( puesto, (error, data) => {
            return Puesto.response(res, error, data);
        })
    })

    .post('/', (req, res, next) => {
      const puesto = {
            idPuesto: null,
            nombre: req.body.nombre,
            baja: false
        };
        console.log('puesto:', puesto);

        Puesto.insert( puesto, (error, data) => {
            return Puesto.response(res, error, data);
        });
    })

module.exports = router;
