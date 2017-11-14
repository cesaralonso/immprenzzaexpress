const router = require('express').Router();
const Rol = require('../models/rol');
const passport = require('passport');

router
    .get('/', (req, res, next) => {
        Rol.all( (error, data) => {
            return Rol.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Rol.count( (error, data) => {
            return Rol.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Rol.exist( req.params.id, (error, data) => {
            return Rol.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const rolId = req.params.id;
        Rol.findById( rolId, (error, data) => {
            return Rol.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        const rolId = req.params.id;
        Rol.remove( rolId, (error, data) => {
            return Rol.response(res, error, data);
        });
    })
    .patch('/', (req, res, next) => {
        const rol = {
            idRol: req.body.idRol,
            nombre: req.body.nombre,
        };
        Rol.update( rol, (error, data) => {
            return Rol.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const rol = {
            idRol: null,
            nombre: req.body.nombre,
            baja: false
        }
        console.log(rol);
        Rol.insert( rol, (error, data) => {
            return Rol.response(res, error, data);
        });
    })


module.exports = router;
