const router = require('express').Router();
const Permiso = require('../models/permiso');
const passport = require('passport');

router
    .get('/', (req, res, next) => {
        Permiso.all( (error, data) => {
            return Permiso.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Permiso.count( (error, data) => {
            return Permiso.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Permiso.exist( req.params.id, (error, data) => {
            return Permiso.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const permisoId = req.params.id;
        Permiso.findById( permisoId, (error, data) => {
            return Permiso.response(res, error, data);
        });
    })

    .delete('/:id', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        const permisoId = req.params.id;
        Permiso.logicRemove( permisoId, (error, data) => {
            return Permiso.response(res, error, data);
        });
    })(req, res, next);
})

    .patch('/', (req, res, next) => {
        const permiso = {
            idPermiso: req.body.idPermiso,
            acceso: req.body.acceso,
            Rol_idRol: req.body.Rol_idRol,
            Modulo_idModulo: req.body.Modulo_idModulo,

        };
        Permiso.update( permiso, (error, data) => {
            return Permiso.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const permiso = {
            idPermiso: null,
            acceso: req.body.acceso,
            Rol_idRol: req.body.Rol_idRol,
            Modulo_idModulo: req.body.Modulo_idModulo,
            baja: false

        };
        console.log(permiso);
        Permiso.insert( permiso, (error, data) => {
            return Permiso.response(res, error, data);
        });
    })

module.exports = router;
