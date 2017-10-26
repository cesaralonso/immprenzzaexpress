const connection = require('../config/db-connection');

const Ingrediente = {};

Ingrediente.all = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM ingrediente', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Ingrediente.findById = (ingredienteId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM ingrediente WHERE idingrediente = ?', 
        [ingredienteId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Ingrediente.count = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`SELECT COUNT(idingrediente) AS count FROM ingrediente`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Ingrediente.exist = (ingredienteId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT EXISTS(SELECT 1 FROM ingrediente WHERE idingrediente = ?) AS exist', [ingredienteId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Ingrediente.insert = (ingrediente, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`INSERT INTO ingrediente SET ?`, [ingrediente], (error, result) => {
        if ( error ) 
            return next({ success: false, error: error })
        else 
            return next( null, { success: true, result: result });
    });
};

Ingrediente.update = (ingrediente, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('UPDATE ingrediente SET ? WHERE idingrediente = ?', [ingrediente, ingrediente.idingrediente], (error, result) => {
        if ( error )
            return next({ success: false, error: error });
        else
            return next( null, { success: true, result: result});
    });
};

Ingrediente.remove = (ingredienteId, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('DELETE FROM ingrediente WHERE idingrediente = ?', [ingredienteId], (error, result) => {
        if(error) return next({ success: false, error: error, message: 'An error has happened while deleting table' });
        return next(null, { success: true, result: result, message: '¡Ingrediente eliminado!' });
    });
};

Ingrediente.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else 
        res.status(200).json(data);
};

module.exports = Ingrediente;