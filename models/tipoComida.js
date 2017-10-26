const connection = require('../config/db-connection');

const TipoComida = {};

TipoComida.all = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM tipoComida', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

TipoComida.findById = (tipoComidaId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM tipoComida WHERE idtipoComida = ?', 
        [tipoComidaId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

TipoComida.count = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`SELECT COUNT(idtipoComida) AS count FROM tipoComida`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

TipoComida.exist = (tipoComidaId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT EXISTS(SELECT 1 FROM tipoComida WHERE idtipoComida = ?) AS exist', [tipoComidaId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

TipoComida.insert = (tipoComida, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`INSERT INTO tipoComida SET ?`, [tipoComida], (error, result) => {
        if ( error ) 
            return next({ success: false, error: error })
        else 
            return next( null, { success: true, result: result });
    });
};

TipoComida.update = (tipoComida, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('UPDATE tipoComida SET ? WHERE idtipoComida = ?', [tipoComida, tipoComida.idtipoComida], (error, result) => {
        if ( error )
            return next({ success: false, error: error });
        else
            return next( null, { success: true, result: result});
    });
};

TipoComida.remove = (tipoComidaId, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('DELETE FROM tipoComida WHERE idtipoComida = ?', [tipoComidaId], (error, result) => {
        if(error) return next({ success: false, error: error, message: 'An error has happened while deleting table' });
        return next(null, { success: true, result: result, message: '¡TipoComida eliminado!' });
    });
};

TipoComida.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else 
        res.status(200).json(data);
};

module.exports = TipoComida;