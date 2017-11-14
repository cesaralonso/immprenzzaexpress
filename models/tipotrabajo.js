const connection = require('../config/db-connection');

const TipoTrabajo = {};

TipoTrabajo.all = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM tipotrabajo HAVING baja IS NULL OR baja = false', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

TipoTrabajo.findById = (TipoTrabajoId, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM tipotrabajo WHERE idTipoTrabajo = ? HAVING baja IS NULL OR baja = false',
    [TipoTrabajoId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

TipoTrabajo.count = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`SELECT COUNT(idTipoTrabajo) AS count FROM tipotrabajo`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

TipoTrabajo.exist = (TipoTrabajoId, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT EXISTS(SELECT 1 FROM tipotrabajo WHERE idTipoTrabajo = ?) AS exist', [TipoTrabajoId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

TipoTrabajo.insert = (TipoTrabajo, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`INSERT INTO tipotrabajo SET ?`, [TipoTrabajo], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo' })
        else
            return next( null, { success: true, result: result, message: 'Registro agregado correctamente' });
    });
};

TipoTrabajo.update = (TipoTrabajo, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('UPDATE tipotrabajo SET ? WHERE idTipoTrabajo = ?', [TipoTrabajo, TipoTrabajo.idTipoTrabajo], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo'});
        else
            return next( null, { success: true, result: result, message: 'Datos actualizados'});
    });
};

TipoTrabajo.logicRemove = (tipotrabajoId, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('UPDATE tipotrabajo SET baja = 1 WHERE idTipoTrabajo = ?', [tipotrabajoId], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al eliminar este registro' });
        else
            return next( null, { success: true, result: result, message: 'TipoTrabajo eliminado' });
    });
};

TipoTrabajo.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = TipoTrabajo;
