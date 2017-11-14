const connection = require('../config/db-connection');

const Abono = {};

Abono.all = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM abono HAVING baja IS NULL OR baja = false', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Abono.findById = (AbonoId, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM abono WHERE idAbono = ? HAVING baja IS NULL OR baja = false',
    [AbonoId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Abono.count = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`SELECT COUNT(idAbono) AS count FROM abono`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Abono.exist = (AbonoId, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT EXISTS(SELECT 1 FROM abono WHERE idAbono = ?) AS exist', [AbonoId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Abono.insert = (Abono, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`INSERT INTO abono SET ?`, [Abono], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo' })
        else
            return next( null, { success: true, result: result, message: 'Registro agregado correctamente' });
    });
};

Abono.update = (Abono, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('UPDATE abono SET ? WHERE idAbono = ?', [Abono, Abono.idAbono], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo'});
        else
            return next( null, { success: true, result: result, message: 'Datos actualizados'});
    });
};

Abono.logicRemove = (abonoId, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('UPDATE abono SET baja = 1 WHERE idAbono = ?', [abonoId], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al eliminar este registro' });
        else
            return next( null, { success: true, result: result, message: 'Abono eliminado' });
    });
};


Abono.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Abono;
