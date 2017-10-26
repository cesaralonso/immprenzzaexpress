const connection = require('../config/db-connection');

const Estado = {};

Estado.all = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM estado', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Estado.findById = (estadoId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM estado WHERE idestado = ?', 
        [estadoId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Estado.count = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`SELECT COUNT(idestado) AS count FROM estado`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Estado.exist = (estadoId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT EXISTS(SELECT 1 FROM estado WHERE idestado = ?) AS exist', [estadoId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Estado.insert = (estado, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`INSERT INTO estado SET ?`, [estado], (error, result) => {
        if ( error ) 
            return next({ success: false, error: error })
        else 
            return next( null, { success: true, result: result });
    });
};

Estado.update = (estado, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('UPDATE estado SET ? WHERE idestado = ?', [estado, estado.idestado], (error, result) => {
        if ( error )
            return next({ success: false, error: error });
        else
            return next( null, { success: true, result: result});
    });
};

Estado.remove = (estadoId, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('DELETE FROM estado WHERE idestado = ?', [estadoId], (error, result) => {
        if(error) return next({ success: false, error: error, message: 'An error has happened while deleting table' });
        return next(null, { success: true, result: result, message: '¡Estado eliminado!' });
    });
};

Estado.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else 
        res.status(200).json(data);
};

module.exports = Estado;