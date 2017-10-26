const router = require('express').Router();
const PlatilloOrdenado = require('../models/platilloOrdenado');

router
    .get('/', (req, res, next) => {
        PlatilloOrdenado.all( (error, data) => {
            return PlatilloOrdenado.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        PlatilloOrdenado.count( (error, data) => {
            return PlatilloOrdenado.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        PlatilloOrdenado.exist( req.params.id, (error, data) => {
            return PlatilloOrdenado.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const platilloOrdenadoId = req.params.id;
        PlatilloOrdenado.findById( platilloOrdenadoId, (error, data) => {
            return PlatilloOrdenado.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        const platilloOrdenadoId = req.params.id;
        PlatilloOrdenado.remove( platilloOrdenadoId, (error, data) => {
            return PlatilloOrdenado.response(res, error, data);
        });
    })
    .patch('/', (req, res, next) => {
        const platilloOrdenado = {
            idplatilloOrdenado: req.body.idplatilloOrdenado,
            user_iduser: req.body.user_iduser,
            res_has_pla_restaurante_idrestaurante: req.body.res_has_pla_restaurante_idrestaurante,
            res_has_pla_platillo_idplatillo: req.body.res_has_pla_platillo_idplatillo,
            horaSale: req.body.horaSale,
            horaEntregado: req.body.horaEntregado,
            horaPreparacion: req.body.horaPreparacion,
            horaSolicitado: req.body.horaSolicitado,
            status: req.body.status
        };
        PlatilloOrdenado.update( platilloOrdenado, (error, data) => {
            return PlatilloOrdenado.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            const platilloOrdenado = {
                idplatilloOrdenado: null,
                user_iduser: req.body.user_iduser,
                res_has_pla_restaurante_idrestaurante: req.body.res_has_pla_restaurante_idrestaurante,
                res_has_pla_platillo_idplatillo: req.body.res_has_pla_platillo_idplatillo,
                horaSale: req.body.horaSale,
                horaEntregado: req.body.horaEntregado,
                horaPreparacion: req.body.horaPreparacion,
                horaSolicitado: req.body.horaSolicitado,
                status: req.body.status,
                created_by: user.userid
            };
            console.log('Platillo Ordenado: ', platilloOrdenado);
            PlatilloOrdenado.insert( platilloOrdenado, (error, data) => {
                return PlatilloOrdenado.response(res, error, data);
            });
        })(req, res, next);
    })

module.exports = router;