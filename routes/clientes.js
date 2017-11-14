const router = require('express').Router();
const Cliente = require('../models/cliente');
const passport = require('passport');

router
    .get('/', (req, res, next) => {
        Cliente.all( (error, data) => {
            return Cliente.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Cliente.count( (error, data) => {
            return Cliente.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Cliente.exist( req.params.id, (error, data) => {
            return Cliente.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const clienteId = req.params.id;
        Cliente.findById( clienteId, (error, data) => {
            return Cliente.response(res, error, data);
        });
    })

    .delete('/:id', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        const clienteId = req.params.id;
        Cliente.logicRemove( clienteId, (error, data) => {
            return Cliente.response(res, error, data);
        });
    })(req, res, next);
})

    .patch('/', (req, res, next) => {
        const cliente = {
            idCliente: req.body.idCliente,
            Persona_idPersona: req.body.Persona_idPersona,
        };
        Cliente.update( cliente, (error, data) => {
            return Cliente.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const cliente = {
            idCliente: null,
            Persona_idPersona: req.body.Persona_idPersona,
            baja: false
        };
        console.log(cliente);
        Cliente.insert( cliente, (error, data) => {
            return Cliente.response(res, error, data);
        });
    })

module.exports = router;
