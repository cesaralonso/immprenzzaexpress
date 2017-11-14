const connection = require('../config/db-connection');

const Rol = {};

Rol.all = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM rol HAVING baja IS NULL OR baja = false', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Rol.findById = (rolId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM rol WHERE idRol = ? HAVING baja IS NULL OR baja = false',
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
        connection.query(`SELECT COUNT(idRol) AS count FROM rol`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Rol.exist = (rolId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT EXISTS(SELECT 1 FROM rol WHERE idRol = ?) AS exist', [rolId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Rol.insert = (Rol, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`INSERT INTO rol SET ?`, [Rol], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo' })
        else
            return next( null, { success: true, result: result, message: 'Registro agregado correctamente' });
    });
};

Rol.update = (Rol, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('UPDATE rol SET ? WHERE idRol = ?', [Rol, Rol.idRol], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo'});
        else
            return next( null, { success: true, result: result, message: 'Datos actualizados'});
    });
};

Rol.logicRemove = (rolId, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('UPDATE rol SET baja = 1 WHERE idRol = ?', [rolId], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al eliminar este registro' });
        else
            return next( null, { success: true, result: result, message: 'Rol eliminado' });
    });
};
Rol.remove = (rolId, cb) => {
    if( connection ) {
        connection.query('DELETE FROM rol WHERE idRol = ?', [rolId], (error, result) => {
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
