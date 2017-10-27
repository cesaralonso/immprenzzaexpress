const connection = require('../config/db-connection');

const TipoTrabajo = {};

TipoTrabajo.all = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM tipotrabajo', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

TipoTrabajo.findById = (TipoTrabajoId, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM tipotrabajo WHERE idTipoTrabajo = ?',
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
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

TipoTrabajo.update = (TipoTrabajo, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('UPDATE tipotrabajo SET ? WHERE idTipoTrabajo = ?', [TipoTrabajo, TipoTrabajo.idTipoTrabajo], (error, result) => {
        if ( error )
            return next({ success: false, error: error });
        else
            return next( null, { success: true, result: result});
    });
};

TipoTrabajo.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = TipoTrabajo;
