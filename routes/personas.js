const router = require('express').Router();
const Persona = require('../models/persona');
const passport = require('passport');

router
    .get('/', (req, res, next) => {
        Persona.all( (error, data) => {
            return Persona.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Persona.count( (error, data) => {
            return Persona.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Persona.exist( req.params.id, (error, data) => {
            return Persona.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const personaId = req.params.id;
        Persona.findById( personaId, (error, data) => {
            return Persona.response(res, error, data);
        });
    })

    .delete('/:id', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        const personaId = req.params.id;
        Persona.logicRemove( personaId, (error, data) => {
            return Persona.response(res, error, data);
        });
    })(req, res, next);
})

    .patch('/', (req, res, next) => {
        const persona = {
            idPersona: req.body.idPersona,
            nombre: req.body.nombre,
            edad: req.body.edad,
            sexo: req.body.sexo,
            rfc: req.body.rfc,
            telefono: req.body.telefono,
            domicilio: req.body.domicilio,
        };
        Persona.update( persona, (error, data) => {
            return Persona.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const persona = {
            idPersona: null,
            nombre: req.body.nombre,
            edad: req.body.edad,
            sexo: req.body.sexo,
            rfc: req.body.rfc,
            telefono: req.body.telefono,
            domicilio: req.body.domicilio,
            baja: false
        };
        console.log(persona);
        Persona.insert( persona, (error, data) => {
            return Persona.response(res, error, data);
        });
    })

module.exports = router;
