const connection = require('../config/db-connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const mySecretPass = process.env.SECRET_PASSWORD;


const User = {};

User.register = (User, next) => {
    if ( !connection )
        return next('Connection refused');
    // Hash password
    bcrypt.hash(User.password, saltRounds)
    .then( hash => {
        User.password = hash;
        // Insert into table
        connection.query('INSERT INTO user SET ?', [User], ( error, result ) => {
            if ( error ) {
                // WARNING: To take effect, User table must have the email field as unique column
                if (error.code === 'ER_DUP_ENTRY') {
                    return next( null, {
                        success: false,
                        error: error,
                        message: 'Este email ya esta en uso'
                    });
                } else
                    return next({ success: false, error: error });
            }

            return next( null, {
                success: true,
                result: result,
                message: '¡Registro exitoso!'
            });
        })
    })
    .catch( error => next({ success: false, error: error }) );
}

User.login = ( email, password, next ) => {
    if ( !connection )
        return next('Connection refused');

    connection.query(`
        SELECT idUser, email, password FROM user WHERE email = ?`, [email], (error, result) => {
        if ( error )
            return next( error );
        if ( result[0] ) {
            const hash = result[0].password.toString();

            console.log('hash', hash);
            console.log('result[0].password.toString()', result[0].password.toString());
            console.log('password', password);

bcrypt.hash(password, saltRounds)
    .then( hash => {
            console.log('password hash', hash);
    });




            bcrypt.compare(password, hash, ( error, res ) => {


            console.log('res', res);

                if ( res ) {
                    const User = {
                        idUser: result[0].idUser,
                        email: result[0].email,
                        password: hash
                    }
                    // Generate token
                    const token = jwt.sign(User, mySecretPass, {
                        expiresIn: 60 * 60 * 24
                    });
                    return next( null, {
                        success: true,
                        message: 'Has iniciado sessión correctamente',
                        token: 'JWT ' + token
                    });
                } else
                    return next(null, {
                        success: false,
                        message: 'Password incorrecto'
                    });
            });
        } else {
            return next(null, {
                success: false,
                message: 'El usuario y password no coinciden'
            })
        }
    });
}

User.all = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM user', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

User.findById = (UserId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM user WHERE idUser = ?',
        [UserId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

User.count = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`SELECT COUNT(idUser) AS count FROM user`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

User.exist = (UserId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT EXISTS(SELECT 1 FROM user WHERE idUser = ?) AS exist', [UserId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

User.update = (User, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('UPDATE user SET ? WHERE idUser = ?', [User, User.idUser], (error, result) => {
        if ( error )
            return next({ success: false, error: error });
        else
            return next( null, { success: true, result: result});
    });
};

User.remove = (UserId, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('DELETE FROM user WHERE idUser = ?', [UserId], (error, result) => {
        if(error) return next({ success: false, error: error, message: 'An error has happened while deleting table' });
        return next(null, { success: true, result: result, message: '¡Usuario eliminado!' });
    });
};

User.response = (res, error, data) => {
    if (error)
        res.status(500).json(error);
    else
        res.status(200).json(data);
}

module.exports = User;
