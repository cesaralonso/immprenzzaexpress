const router = require('express').Router();
const Telefono = require('../models/telefono');

router
    .get('/', (req, res, next) => {
        Telefono.all( (error, data) => {
            return Telefono.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Telefono.count( (error, data) => {
            return Telefono.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Telefono.exist( req.params.id, (error, data) => {
            return Telefono.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const telefonoId = req.params.id;
        Telefono.findById( telefonoId, (error, data) => {
            return Telefono.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        const telefonoId = req.params.id;
        Telefono.remove( telefonoId, (error, data) => {
            return Telefono.response(res, error, data);
        });
    })
    .patch('/', (req, res, next) => {
        const telefono = {
            idtelefono: req.body.email,
            numero: req.body.numero,
            lada: req.body.lada,
            compania: req.body.compania,
        };
        Telefono.update( telefono, (error, data) => {
            return Telefono.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        console.log(req.body);
        const telefono = {
            idtelefono: null,
            numero: req.body.numero,
            lada: req.body.lada,
            compania: req.body.compania,
        }
        console.log(telefono);
        Telefono.insert( telefono, (error, data) => {
            return Telefono.response(res, error, data);
        });
    })
    

module.exports = router;