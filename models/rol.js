const connection = require('../config/db-connection');

const Rol = {};

Rol.all = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM rol', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Rol.findById = (rolId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM rol WHERE idrol = ?', 
        [rolId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Rol.count = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`SELECT COUNT(idrol) AS count FROM rol`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Rol.exist = (rolId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT EXISTS(SELECT 1 FROM rol WHERE idrol = ?) AS exist', [rolId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Rol.insert = (rol, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`INSERT INTO rol SET ?`, [rol], (error, result) => {
        if ( error ) 
            return next({ success: false, error: error })
        else 
            return next( null, { success: true, result: result });
    });
};

Rol.update = (rol, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('UPDATE rol SET ? WHERE idrol = ?', [rol, rol.idrol], (error, result) => {
        if ( error )
            return next({ success: false, error: error });
        else
            return next( null, { success: true, result: result});
    });
};

Rol.remove = (rolId, cb) => {
    if( connection ) {
        connection.query('DELETE FROM rol WHERE idrol = ?', [rolId], (error, result) => {
            if(error) return next({ success: false, error: error, message: 'An error has happened while deleting table' });
            return next(null, { success: true, result: result, message: 'Rol eliminado!' });
        });
    }
};

Rol.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else 
        res.status(200).json(data);
};

module.exports = Rol;