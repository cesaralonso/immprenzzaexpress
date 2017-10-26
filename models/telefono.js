const connection = require('../config/db-connection');

const Telefono = {};

Telefono.all = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM telefono', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Telefono.findById = (telefonoId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM telefono WHERE idtelefono = ?', 
        [telefonoId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Telefono.count = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`SELECT COUNT(idtelefono) AS count FROM telefono`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Telefono.exist = (telefonoId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT EXISTS(SELECT 1 FROM telefono WHERE idtelefono = ?) AS exist', [telefonoId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Telefono.insert = (telefono, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`INSERT INTO telefono SET ?`, [telefono], (error, result) => {
        if ( error ) 
            return next({ success: false, error: error })
        else 
            return next( null, { success: true, result: result });
    });
};

Telefono.update = (telefono, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('UPDATE telefono SET ? WHERE idtelefono = ?', [telefono, telefono.idtelefono], (error, result) => {
        if ( error )
            return next({ success: false, error: error });
        else
            return next( null, { success: true, result: result});
    });
};

Telefono.remove = (telefonoId, cb) => {
    if( connection ) {
        connection.query('DELETE FROM telefono WHERE idtelefono = ?', [telefonoId], (error, result) => {
            if(error) return next({ success: false, error: error, message: 'An error has happened while deleting table' });
            return next(null, { success: true, result: result, message: 'Teléfono eliminado!' });
        });
    }
};

Telefono.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else 
        res.status(200).json(data);
};

module.exports = Telefono;