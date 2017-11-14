const connection = require('../config/db-connection');

const Trabajo = {};

Trabajo.all = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM trabajo HAVING baja IS NULL OR baja = false', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Trabajo.findById = (TrabajoId, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM trabajo WHERE idTrabajo = ? HAVING baja IS NULL OR baja = false',
    [TrabajoId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Trabajo.count = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`SELECT COUNT(idTrabajo) AS count FROM trabajo`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Trabajo.exist = (TrabajoId, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT EXISTS(SELECT 1 FROM trabajo WHERE idTrabajo = ?) AS exist', [TrabajoId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Trabajo.insert = (Trabajo, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`INSERT INTO trabajo SET ?`, [Trabajo], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo' })
        else
            return next( null, { success: true, result: result, message: 'Registro agregado correctamente' });
    });
};

Trabajo.update = (Trabajo, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('UPDATE trabajo SET ? WHERE idTrabajo = ?', [Trabajo, Trabajo.idTrabajo], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo'});
        else
            return next( null, { success: true, result: result, message: 'Datos actualizados'});
    });
};

Trabajo.logicRemove = (trabajoId, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('UPDATE trabajo SET baja = 1 WHERE idTrabajo = ?', [trabajoId], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al eliminar este registro' });
        else
            return next( null, { success: true, result: result, message: 'Trabajo eliminado' });
    });
};

Trabajo.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Trabajo;
