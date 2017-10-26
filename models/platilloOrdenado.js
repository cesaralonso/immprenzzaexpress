const connection = require('../config/db-connection');

const PlatilloOrdenado = {};

PlatilloOrdenado.all = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM platilloOrdenado', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

PlatilloOrdenado.findById = (platilloOrdenadoId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM platilloOrdenado WHERE idplatilloOrdenado = ?', 
        [platilloOrdenadoId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

PlatilloOrdenado.count = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`SELECT COUNT(idplatilloOrdenado) AS count FROM platilloOrdenado`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

PlatilloOrdenado.exist = (platilloOrdenadoId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT EXISTS(SELECT 1 FROM platilloOrdenado WHERE idplatilloOrdenado = ?) AS exist', [platilloOrdenadoId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

PlatilloOrdenado.insert = (platilloOrdenado, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`INSERT INTO platilloOrdenado SET ?`, [platilloOrdenado], (error, result) => {
        if ( error ) 
            return next({ success: false, error: error })
        else 
            return next( null, { success: true, result: result });
    });
};

PlatilloOrdenado.update = (platilloOrdenado, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('UPDATE platilloOrdenado SET ? WHERE idplatilloOrdenado = ?', [platilloOrdenado, platilloOrdenado.idplatilloOrdenado], (error, result) => {
        if ( error )
            return next({ success: false, error: error });
        else
            return next( null, { success: true, result: result});
    });
};

PlatilloOrdenado.remove = (platilloOrdenadoId, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('DELETE FROM platilloOrdenado WHERE idplatilloOrdenado = ?', [platilloOrdenadoId], (error, result) => {
        if(error) return next({ success: false, error: error, message: 'An error has happened while deleting table' });
        return next(null, { success: true, result: result, message: '¡PlatilloOrdenado eliminado!' });
    });
};

PlatilloOrdenado.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else 
        res.status(200).json(data);
};

module.exports = PlatilloOrdenado;