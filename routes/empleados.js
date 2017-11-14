const router = require('express').Router();
const Personal = require('../models/personal');
const passport = require('passport');

router
    .get('/', (req, res, next) => {
        Personal.all( (error, data) => {
            return Personal.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Personal.count( (error, data) => {
            return Personal.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Personal.exist( req.params.id, (error, data) => {
            return Personal.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const personalId = req.params.id;
        Personal.findById( personalId, (error, data) => {
            return Personal.response(res, error, data);
        });
    })

    .delete('/:id', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        const personalId = req.params.id;
        Personal.logicRemove( personalId, (error, data) => {
            return Personal.response(res, error, data);
        });
    })(req, res, next);
})

    .patch('/', (req, res, next) => {
        const personal = {
            idPersonal: req.body.idPersonal,
            f_ingreso: req.body.f_ingreso,
            nomina: req.body.nomina,
            frec_nomina: req.body.frec_nomina,
            Persona_idPersona: req.body.Persona_idPersona,
            Puesto_idPuesto: req.body.Puesto_idPuesto,
        };
        Personal.update( personal, (error, data) => {
            return Personal.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const personal = {
            idPersonal: null,
            f_ingreso: req.body.f_ingreso,
            nomina: req.body.nomina,
            frec_nomina: req.body.frec_nomina,
            Persona_idPersona: req.body.Persona_idPersona,
            Puesto_idPuesto: req.body.Puesto_idPuesto,
            baja: false
        };
        console.log(personal);
        Personal.insert( personal, (error, data) => {
            return Personal.response(res, error, data);
        });
    })

module.exports = router;
