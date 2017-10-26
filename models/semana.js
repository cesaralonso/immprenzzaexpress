const connection = require('../config/db-connection');

const Semana = {};

Semana.all = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM semana', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Semana.findById = (semanaId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM semana WHERE idsemana = ?', 
        [semanaId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Semana.count = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`SELECT COUNT(idsemana) AS count FROM semana`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Semana.exist = (semanaId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT EXISTS(SELECT 1 FROM semana WHERE idsemana = ?) AS exist', [semanaId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Semana.insert = (semana, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`INSERT INTO semana SET ?`, [semana], (error, result) => {
        if ( error ) 
            return next({ success: false, error: error })
        else 
            return next( null, { success: true, result: result });
    });
};

Semana.update = (semana, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('UPDATE semana SET ? WHERE idsemana = ?', [semana, semana.idsemana], (error, result) => {
        if ( error )
            return next({ success: false, error: error });
        else
            return next( null, { success: true, result: result});
    });
};

Semana.remove = (semanaId, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('DELETE FROM semana WHERE idsemana = ?', [semanaId], (error, result) => {
        if(error) return next({ success: false, error: error, message: 'An error has happened while deleting table' });
        return next(null, { success: true, result: result, message: '¡Semana eliminada!' });
    });
};

Semana.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else 
        res.status(200).json(data);
};

module.exports = Semana;