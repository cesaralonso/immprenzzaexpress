const connection = require('../config/db-connection');

const Pais = {};

Pais.all = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM pais', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Pais.findById = (paisId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM pais WHERE idpais = ?', 
        [paisId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Pais.count = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`SELECT COUNT(idpais) AS count FROM pais`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Pais.exist = (paisId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT EXISTS(SELECT 1 FROM pais WHERE idpais = ?) AS exist', [paisId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Pais.insert = (pais, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`INSERT INTO pais SET ?`, [pais], (error, result) => {
        if ( error ) 
            return next({ success: false, error: error })
        else 
            return next( null, { success: true, result: result });
    });
};

Pais.update = (pais, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('UPDATE pais SET ? WHERE idpais = ?', [pais, pais.idpais], (error, result) => {
        if ( error )
            return next({ success: false, error: error });
        else
            return next( null, { success: true, result: result});
    });
};

Pais.remove = (paisId, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('DELETE FROM pais WHERE idpais = ?', [paisId], (error, result) => {
        if(error) return next({ success: false, error: error, message: 'An error has happened while deleting table' });
        return next(null, { success: true, result: result, message: '¡Pais eliminado!' });
    });
};

Pais.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else 
        res.status(200).json(data);
};

module.exports = Pais;