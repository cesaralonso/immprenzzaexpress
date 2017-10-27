const router = require('express').Router();
const Trabajo = require('../models/trabajo');

router
    .get('/', (req, res, next) => {
        Trabajo.all( (error, data) => {
            return Trabajo.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Trabajo.count( (error, data) => {
            return Trabajo.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Trabajo.exist( req.params.id, (error, data) => {
            return Trabajo.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const trabajoId = req.params.id;
        Trabajo.findById( trabajoId, (error, data) => {
            return Trabajo.response(res, error, data);
        });
    })
    .patch('/', (req, res, next) => {
        const trabajo = {
            idTrabajo: req.body.idTrabajo,
            cantidad: req.body.cantidad,
            archivo: req.body.archivo,
            foto: req.body.foto,
            f_entragaEsperada: req.body.f_entragaEsperada,
            f_entragaReal: req.body.f_entragaReal,
            status: req.body.status,
            especificaciones: req.body.especificaciones,
            f_recibe: req.body.f_recibe,
            total: req.body.total,
            Personal_idPersonal: req.body.Personal_idPersonal,
            TipoTrabajo_idTipoTrabajo: req.body.TipoTrabajo_idTipoTrabajo,
            Orden_idOrden: req.body.Orden_idOrden,
        };
        Trabajo.update( trabajo, (error, data) => {
            return Trabajo.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const trabajo = {
            idTrabajo: null,
            cantidad: req.body.cantidad,
            archivo: req.body.archivo,
            foto: req.body.foto,
            f_entragaEsperada: req.body.f_entragaEsperada,
            f_entragaReal: req.body.f_entragaReal,
            status: req.body.status,
            especificaciones: req.body.especificaciones,
            f_recibe: req.body.f_recibe,
            total: req.body.total,
            Personal_idPersonal: req.body.Personal_idPersonal,
            TipoTrabajo_idTipoTrabajo: req.body.TipoTrabajo_idTipoTrabajo,
            Orden_idOrden: req.body.Orden_idOrden,
          };
        console.log(trabajo);
        Trabajo.insert( trabajo, (error, data) => {
            return Trabajo.response(res, error, data);
        });
    })

module.exports = router;
