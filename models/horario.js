const connection = require('../config/db-connection');

const Horario = {};

Horario.all = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM horario', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Horario.findById = (horarioId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM horario WHERE idhorario = ?', 
        [horarioId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Horario.count = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`SELECT COUNT(idhorario) AS count FROM horario`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Horario.exist = (horarioId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT EXISTS(SELECT 1 FROM horario WHERE idhorario = ?) AS exist', [horarioId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Horario.insert = (horario, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`INSERT INTO horario SET ?`, [horario], (error, result) => {
        if ( error ) 
            return next({ success: false, error: error })
        else 
            return next( null, { success: true, result: result });
    });
};

Horario.update = (horario, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('UPDATE horario SET ? WHERE idhorario = ?', [horario, horario.idhorario], (error, result) => {
        if ( error )
            return next({ success: false, error: error });
        else
            return next( null, { success: true, result: result});
    });
};

Horario.remove = (horarioId, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('DELETE FROM horario WHERE idhorario = ?', [horarioId], (error, result) => {
        if(error) return next({ success: false, error: error, message: 'An error has happened while deleting table' });
        return next(null, { success: true, result: result, message: '¡Horario eliminado!' });
    });
};

Horario.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else 
        res.status(200).json(data);
};

module.exports = Horario;