const connection = require('../config/db-connection');

const Pago = {};

Pago.all = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM pago', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Pago.findById = (pagoId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM pago WHERE idpago = ?', 
        [pagoId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Pago.count = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`SELECT COUNT(idpago) AS count FROM pago`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Pago.exist = (pagoId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT EXISTS(SELECT 1 FROM pago WHERE idpago = ?) AS exist', [pagoId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Pago.insert = (pago, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`INSERT INTO pago SET ?`, [pago], (error, result) => {
        if ( error ) 
            return next({ success: false, error: error })
        else 
            return next( null, { success: true, result: result });
    });
};

Pago.update = (pago, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('UPDATE pago SET ? WHERE idpago = ?', [pago, pago.idpago], (error, result) => {
        if ( error )
            return next({ success: false, error: error });
        else
            return next( null, { success: true, result: result});
    });
};

Pago.remove = (pagoId, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('DELETE FROM pago WHERE idpago = ?', [pagoId], (error, result) => {
        if(error) return next({ success: false, error: error, message: 'An error has happened while deleting table' });
        return next(null, { success: true, result: result, message: '¡Pago eliminado!' });
    });
};

Pago.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else 
        res.status(200).json(data);
};

module.exports = Pago;