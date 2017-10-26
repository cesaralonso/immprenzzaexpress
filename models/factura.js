const connection = require('../config/db-connection');

const Factura = {};

Factura.all = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM factura', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Factura.findById = (facturaId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM factura WHERE idfactura = ?', 
        [facturaId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Factura.count = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`SELECT COUNT(idfactura) AS count FROM factura`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Factura.exist = (facturaId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT EXISTS(SELECT 1 FROM factura WHERE idfactura = ?) AS exist', [facturaId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Factura.insert = (factura, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`INSERT INTO factura SET ?`, [factura], (error, result) => {
        if ( error ) 
            return next({ success: false, error: error })
        else 
            return next( null, { success: true, result: result });
    });
};

Factura.update = (factura, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('UPDATE factura SET ? WHERE idfactura = ?', [factura, factura.idfactura], (error, result) => {
        if ( error )
            return next({ success: false, error: error });
        else
            return next( null, { success: true, result: result});
    });
};

Factura.remove = (facturaId, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('DELETE FROM factura WHERE idfactura = ?', [facturaId], (error, result) => {
        if(error) return next({ success: false, error: error, message: 'An error has happened while deleting table' });
        return next(null, { success: true, result: result, message: '¡Factura eliminada!' });
    });
};

Factura.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else 
        res.status(200).json(data);
};

module.exports = Factura;