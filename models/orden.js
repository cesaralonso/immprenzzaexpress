const connection = require('../config/db-connection');

const Orden = {};

Orden.all = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM orden', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Orden.findById = (ordenId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM orden WHERE idorden = ?', 
        [ordenId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Orden.count = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`SELECT COUNT(idorden) AS count FROM orden`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Orden.exist = (ordenId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT EXISTS(SELECT 1 FROM orden WHERE idorden = ?) AS exist', [ordenId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Orden.insert = (orden, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`INSERT INTO orden SET ?`, [orden], (error, result) => {
        if ( error ) 
            return next({ success: false, error: error })
        else 
            return next( null, { success: true, result: result });
    });
};

Orden.update = (orden, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('UPDATE orden SET ? WHERE idorden = ?', [orden, orden.idorden], (error, result) => {
        if ( error )
            return next({ success: false, error: error });
        else
            return next( null, { success: true, result: result});
    });
};

Orden.remove = (ordenId, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('DELETE FROM orden WHERE idorden = ?', [ordenId], (error, result) => {
        if(error) return next({ success: false, error: error, message: 'An error has happened while deleting table' });
        return next(null, { success: true, result: result, message: '¡Orden eliminada!' });
    });
};

Orden.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else 
        res.status(200).json(data);
};

module.exports = Orden;