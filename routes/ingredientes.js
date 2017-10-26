const router = require('express').Router();
const Ingrediente = require('../models/ingrediente');

router
    .get('/', (req, res, next) => {
        Ingrediente.all( (error, data) => {
            return Ingrediente.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Ingrediente.count( (error, data) => {
            return Ingrediente.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Ingrediente.exist( req.params.id, (error, data) => {
            return Ingrediente.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const ingredienteId = req.params.id;
        Ingrediente.findById( ingredienteId, (error, data) => {
            return Ingrediente.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        const ingredienteId = req.params.id;
        Ingrediente.remove( ingredienteId, (error, data) => {
            return Ingrediente.response(res, error, data);
        });
    })
    .patch('/', (req, res, next) => {
        const ingrediente = {
            idingrediente: req.body.idingrediente,
            nombre: req.body.nombre,
            proteinas: req.body.proteinas,
            calorias: req.body.calorias,
            carbohidratos: req.body.carbohidratos,
            grasas: req.body.grasas
        };
        Ingrediente.update( ingrediente, (error, data) => {
            return Ingrediente.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const ingrediente = {
            idingrediente: null,
            nombre: req.body.nombre,
            proteinas: req.body.proteinas,
            calorias: req.body.calorias,
            carbohidratos: req.body.carbohidratos,
            grasas: req.body.grasas
        };
        console.log(ingrediente);
        Ingrediente.insert( ingrediente, (error, data) => {
            return Ingrediente.response(res, error, data);
        });
    })

module.exports = router;