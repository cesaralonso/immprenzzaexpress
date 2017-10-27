const connection = require('../config/db-connection');

const Abono = {};

Abono.all = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM abono', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Abono.findById = (AbonoId, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM abono WHERE idAbono = ?',
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
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Abono.update = (Abono, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('UPDATE abono SET ? WHERE idAbono = ?', [Abono, Abono.idAbono], (error, result) => {
        if ( error )
            return next({ success: false, error: error });
        else
            return next( null, { success: true, result: result});
    });
};

Abono.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Abono;
