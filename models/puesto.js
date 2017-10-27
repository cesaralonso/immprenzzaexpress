const connection = require('../config/db-connection');

const Puesto = {};

Puesto.all = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM puesto', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Puesto.findById = (PuestoId, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM puesto WHERE idPuesto = ?',
    [PuestoId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Puesto.count = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`SELECT COUNT(idPuesto) AS count FROM puesto`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Puesto.exist = (PuestoId, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT EXISTS(SELECT 1 FROM puesto WHERE idPuesto = ?) AS exist', [PuestoId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Puesto.insert = (puesto, next) => {
  console.log('puesto',puesto);
    if ( !connection )
        return next('Connection refused');
    connection.query('INSERT INTO puesto SET ?', [puesto], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result, }
            );
    });
};

Puesto.update = (puesto, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('UPDATE puesto SET ? WHERE idPuesto = ?', [puesto, Puesto.idPuesto], (error, result) => {
        if ( error )
            return next({ success: false, error: error });
        else
            return next( null, { success: true, result: result});
    });
};

Puesto.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Puesto;
