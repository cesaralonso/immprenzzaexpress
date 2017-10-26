const router = require('express').Router();
const Combo = require('../models/combo');

router
    .get('/', (req, res, next) => {
        Combo.all( (error, data) => {
            return Combo.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Combo.count( (error, data) => {
            return Combo.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Combo.exist( req.params.id, (error, data) => {
            return Combo.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const comboId = req.params.id;
        Combo.findById( comboId, (error, data) => {
            return Combo.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        const comboId = req.params.id;
        Combo.remove( comboId, (error, data) => {
            return Combo.response(res, error, data);
        });
    })
    .patch('/', (req, res, next) => {
        const combo = {
            idcombo: req.body.idcombo,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            fecha_ini: req.body.fecha_ini,
            fecha_fin: req.body.fecha_fin,
        };
        Combo.update( combo, (error, data) => {
            return Combo.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const combo = {
            idcombo: null,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            fecha_ini: req.body.fecha_ini,
            fecha_fin: req.body.fecha_fin,
        };
        console.log(combo);
        Combo.insert( combo, (error, data) => {
            return Combo.response(res, error, data);
        });
    })

module.exports = router;