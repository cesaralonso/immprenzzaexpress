const connection = require('../config/db-connection');

const Platillo = {};

Platillo.all = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM platillo', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Platillo.findById = (platilloId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM platillo WHERE idplatillo = ?', 
        [platilloId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Platillo.count = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`SELECT COUNT(idplatillo) AS count FROM platillo`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Platillo.exist = (platilloId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT EXISTS(SELECT 1 FROM platillo WHERE idplatillo = ?) AS exist', [platilloId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Platillo.insert = (platillo, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`INSERT INTO platillo SET ?`, [platillo], (error, result) => {
        if ( error ) 
            return next({ success: false, error: error })
        else 
            return next( null, { success: true, result: result });
    });
};

Platillo.update = (platillo, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('UPDATE platillo SET ? WHERE idplatillo = ?', [platillo, platillo.idplatillo], (error, result) => {
        if ( error )
            return next({ success: false, error: error });
        else
            return next( null, { success: true, result: result});
    });
};

Platillo.remove = (platilloId, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('DELETE FROM platillo WHERE idplatillo = ?', [platilloId], (error, result) => {
        if(error) return next({ success: false, error: error, message: 'An error has happened while deleting table' });
        return next(null, { success: true, result: result, message: '¡Platillo eliminado!' });
    });
};

Platillo.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else 
        res.status(200).json(data);
};

module.exports = Platillo;