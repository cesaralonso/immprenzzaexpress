const router = require('express').Router();
const Tipotrabajo = require('../models/tipotrabajo');
const passport = require('passport');

router
    .get('/', (req, res, next) => {
        Tipotrabajo.all( (error, data) => {
            return Tipotrabajo.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Tipotrabajo.count( (error, data) => {
            return Tipotrabajo.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Tipotrabajo.exist( req.params.id, (error, data) => {
            return Tipotrabajo.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const tipotrabajoId = req.params.id;
        Tipotrabajo.findById( tipotrabajoId, (error, data) => {
            return Tipotrabajo.response(res, error, data);
        });
    })

    .delete('/:id', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        const tipotrabajoId = req.params.id;
        Tipotrabajo.logicRemove( tipotrabajoId, (error, data) => {
            return Tipotrabajo.response(res, error, data);
        });
    })(req, res, next);
})

    .patch('/', (req, res, next) => {
        const tipotrabajo = {
            idTipoTrabajo: req.body.idTipoTrabajo,
            nombre: req.body.nombre,
            costo: req.body.costo,
        };
        Tipotrabajo.update( tipotrabajo, (error, data) => {
            return Tipotrabajo.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const tipotrabajo = {
            idTipoTrabajo: null,
            nombre: req.body.nombre,
            costo: req.body.costo,
            baja: false
          };
        console.log(tipotrabajo);
        Tipotrabajo.insert( tipotrabajo, (error, data) => {
            return Tipotrabajo.response(res, error, data);
        });
    })

module.exports = router;
