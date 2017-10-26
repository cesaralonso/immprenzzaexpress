const connection = require('../config/db-connection');

const Direccion = {};

Direccion.all = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM direccion', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Direccion.findById = (direccionId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM direccion WHERE iddireccion = ?', 
        [direccionId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Direccion.count = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`SELECT COUNT(iddireccion) AS count FROM direccion`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Direccion.exist = (direccionId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT EXISTS(SELECT 1 FROM direccion WHERE iddireccion = ?) AS exist', [direccionId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Direccion.insert = (direccion, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`INSERT INTO direccion SET ?`, [direccion], (error, result) => {
        if ( error ) 
            return next({ success: false, error: error })
        else 
            return next( null, { success: true, result: result });
    });
};

Direccion.update = (direccion, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('UPDATE direccion SET ? WHERE iddireccion = ?', [direccion, direccion.iddireccion], (error, result) => {
        if ( error )
            return next({ success: false, error: error });
        else
            return next( null, { success: true, result: result});
    });
};

Direccion.remove = (direccionId, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('DELETE FROM direccion WHERE iddireccion = ?', [direccionId], (error, result) => {
        if(error) return next({ success: false, error: error, message: 'An error has happened while deleting table' });
        return next(null, { success: true, result: result, message: '¡Direccion eliminado!' });
    });
};

Direccion.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else 
        res.status(200).json(data);
};

module.exports = Direccion;