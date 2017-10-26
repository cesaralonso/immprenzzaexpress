const router = require('express').Router();
const Direccion = require('../models/direccion');

router
    .get('/', (req, res, next) => {
        Direccion.all( (error, data) => {
            return Direccion.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Direccion.count( (error, data) => {
            return Direccion.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Direccion.exist( req.params.id, (error, data) => {
            return Direccion.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const direccionId = req.params.id;
        Direccion.findById( direccionId, (error, data) => {
            return Direccion.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        const direccionId = req.params.id;
        Direccion.remove( direccionId, (error, data) => {
            return Direccion.response(res, error, data);
        });
    })
    .patch('/', (req, res, next) => {
        const direccion = {
            iddireccion: req.body.iddireccion,
            calle: req.body.calle,
            entrecalle1: req.body.entrecalle1,
            lat: req.body.lat,
            lng: req.body.lng,
            numext: req.body.numext,
            numint: req.body.numint,
            colonia: req.body.colonia,
            cp: req.body.cp,
            ciudad_idciudad: req.body.ciudad_idciudad,
            principal: req.body.principal,
        };
        Direccion.update( direccion, (error, data) => {
            return Direccion.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const direccion = {
            iddireccion: null,
            calle: req.body.calle,
            entrecalle1: req.body.entrecalle1,
            lat: req.body.lat,
            lng: req.body.lng,
            numext: req.body.numext,
            numint: req.body.numint,
            colonia: req.body.colonia,
            cp: req.body.cp,
            ciudad_idciudad: req.body.ciudad_idciudad,
            principal: req.body.principal,
        };
        console.log(direccion);
        Direccion.insert( direccion, (error, data) => {
            return Direccion.response(res, error, data);
        });
    })

module.exports = router;