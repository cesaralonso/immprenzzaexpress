const connection = require('../config/db-connection');

const Modulo = {};

Modulo.all = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM modulo', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Modulo.findById = (ModuloId, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM modulo WHERE idModulo = ?',
    [ModuloId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Modulo.count = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`SELECT COUNT(idModulo) AS count FROM modulo`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Modulo.exist = (ModuloId, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT EXISTS(SELECT 1 FROM modulo WHERE idModulo = ?) AS exist', [ModuloId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Modulo.insert = (Modulo, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`INSERT INTO modulo SET ?`, [Modulo], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Modulo.update = (Modulo, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('UPDATE modulo SET ? WHERE idModulo = ?', [Modulo, Modulo.idModulo], (error, result) => {
        if ( error )
            return next({ success: false, error: error });
        else
            return next( null, { success: true, result: result});
    });
};

Modulo.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Modulo;
