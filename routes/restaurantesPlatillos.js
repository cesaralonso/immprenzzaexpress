const router = require('express').Router();
const passport = require('passport');
const RestaurantePlatillo = require('../models/restaurantePlatillo');

router
    .get('/', (req, res, next) => {
        RestaurantePlatillo.all( (error, data) => {
            return RestaurantePlatillo.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        RestaurantePlatillo.count( (error, data) => {
            return RestaurantePlatillo.response(res, error, data);
        });
    })
    .get('/getByParam/:column/:param', (req, res, next) => {
        const column = req.params.column;
        const param = req.params.param;
        RestaurantePlatillo.findByParam( column, param, (error, data) => {
            return RestaurantePlatillo.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        RestaurantePlatillo.exist( req.params.id, (error, data) => {
            return RestaurantePlatillo.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const platilloId = req.params.id;
        RestaurantePlatillo.findById( platilloId, (error, data) => {
            return RestaurantePlatillo.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        const platilloId = req.params.id;
        RestaurantePlatillo.remove( platilloId, (error, data) => {
            return RestaurantePlatillo.response(res, error, data);
        });
    })
    .patch('/', (req, res, next) => {
        const restaurantePlatillo = {
            restaurante_idrestaurante: req.body.restaurante_idrestaurante,
            platillo_idplatillo: req.body.platillo_idplatillo,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            tiempopreparacion: req.body.tiempopreparacion
        };
        RestaurantePlatillo.update( restaurantePlatillo, (error, data) => {
            return RestaurantePlatillo.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            const restaurantePlatillo = {
                restaurante_idrestaurante: req.body.restaurante_idrestaurante,
                platillo_idplatillo: req.body.platillo_idplatillo,
                precio: req.body.precio,
                descripcion: req.body.descripcion,
                tiempopreparacion: req.body.tiempopreparacion,
                created_by: user.iduser
            };
            console.log(restaurantePlatillo);
            RestaurantePlatillo.insert( restaurantePlatillo, (error, data) => {
                return RestaurantePlatillo.response(res, error, data);
            });
        })(req, res, next);
    })

module.exports = router;