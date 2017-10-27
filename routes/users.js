const router = require('express').Router();
const User = require('../models/user');
const passport = require('passport');

router
    .post('/register', (req, res, next) => {
        const user = {
          idUser: null,
          usuario: req.body.usuario,
          password: req.body.password,
          Rol_idRol: req.body.Rol_idRol,
        }
        User.register( user, (error, data) =>{
            User.response(res, error, data);
        });
    })
    .post('/login', (req, res, next) => {
        const usuario = req.body.usuario;
        const password = req.body.password;
        console.log(usuario)
        console.log(password)
        User.login( usuario, password, ( error, data ) => {
            return User.response( res, error, data );
        });
    })
    // Route with authentication
    .post('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
        res.send('Route Authentication Works!');
    })
    // .post('/profile', (req, res, next) => { // http://passportjs.org/docs -> Custom Callback
    //     passport.authenticate('jwt', { session: false}, (err, user, info) => {
    //         console.log(user.idUser);
    //         //
    //     })(req, res, next);
    // })
    .get('/', (req, res, next) => {
        User.all( (error, data) => {
            return User.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        User.count( (error, data) => {
            return User.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        User.exist( req.params.id, (error, data) => {
            return User.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const userId = req.params.id;
        User.findById( userId, (error, data) => {
            return User.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        const userId = req.params.id;
        User.remove( userId, (error, data) => {
            return User.response(res, error, data);
        });
    })
    .patch('/', (req, res, next) => {
        const user = {
          idUser: req.body.idUser,
          usuario: req.body.usuario,
          password: req.body.password,
          Rol_idRol: req.body.Rol_idRol,
        };
        User.update( user, (error, data) => {
            return User.response(res, error, data);
        })
    })


module.exports = router;
