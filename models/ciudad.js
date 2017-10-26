const connection = require('../config/db-connection');

const Ciudad = {};

Ciudad.all = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM ciudad', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Ciudad.findById = (ciudadId, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM ciudad WHERE idciudad = ?', 
    [ciudadId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Ciudad.count = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`SELECT COUNT(idciudad) AS count FROM ciudad`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Ciudad.exist = (ciudadId, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT EXISTS(SELECT 1 FROM ciudad WHERE idciudad = ?) AS exist', [ciudadId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Ciudad.insert = (ciudad, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`INSERT INTO ciudad SET ?`, [ciudad], (error, result) => {
        if ( error ) 
            return next({ success: false, error: error })
        else 
            return next( null, { success: true, result: result });
    });
};

Ciudad.update = (ciudad, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('UPDATE ciudad SET ? WHERE idciudad = ?', [ciudad, ciudad.idciudad], (error, result) => {
        if ( error )
            return next({ success: false, error: error });
        else
            return next( null, { success: true, result: result});
    });
};

Ciudad.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else 
        res.status(200).json(data);
};

module.exports = Ciudad;