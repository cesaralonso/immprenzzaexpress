const connection = require('../config/db-connection');

const Combo = {};

Combo.all = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM combo', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Combo.findById = (comboId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM combo WHERE idcombo = ?', 
        [comboId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Combo.count = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`SELECT COUNT(idcombo) AS count FROM combo`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Combo.exist = (comboId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT EXISTS(SELECT 1 FROM combo WHERE idcombo = ?) AS exist', [comboId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Combo.insert = (combo, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`INSERT INTO combo SET ?`, [combo], (error, result) => {
        if ( error ) 
            return next({ success: false, error: error })
        else 
            return next( null, { success: true, result: result });
    });
};

Combo.update = (combo, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('UPDATE combo SET ? WHERE idcombo = ?', [combo, combo.idcombo], (error, result) => {
        if ( error )
            return next({ success: false, error: error });
        else
            return next( null, { success: true, result: result});
    });
};

Combo.remove = (comboId, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('DELETE FROM combo WHERE idcombo = ?', [comboId], (error, result) => {
        if(error) return next({ success: false, error: error, message: 'An error has happened while deleting table' });
        return next(null, { success: true, result: result, message: '¡Combo eliminado!' });
    });
};

Combo.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else 
        res.status(200).json(data);
};

module.exports = Combo;