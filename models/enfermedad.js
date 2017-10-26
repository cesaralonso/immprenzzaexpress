const connection = require('../config/db-connection');

const Enfermedad = {};

Enfermedad.all = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM enfermedad', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Enfermedad.findById = (enfermedadId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM enfermedad WHERE idenfermedad = ?', 
        [enfermedadId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Enfermedad.count = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`SELECT COUNT(idenfermedad) AS count FROM enfermedad`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Enfermedad.exist = (enfermedadId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT EXISTS(SELECT 1 FROM enfermedad WHERE idenfermedad = ?) AS exist', [enfermedadId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Enfermedad.insert = (enfermedad, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`INSERT INTO enfermedad SET ?`, [enfermedad], (error, result) => {
        if ( error ) 
            return next({ success: false, error: error })
        else 
            return next( null, { success: true, result: result });
    });
};

Enfermedad.update = (enfermedad, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('UPDATE enfermedad SET ? WHERE idenfermedad = ?', [enfermedad, enfermedad.idenfermedad], (error, result) => {
        if ( error )
            return next({ success: false, error: error });
        else
            return next( null, { success: true, result: result});
    });
};

Enfermedad.remove = (enfermedadId, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('DELETE FROM enfermedad WHERE idenfermedad = ?', [enfermedadId], (error, result) => {
        if(error) return next({ success: false, error: error, message: 'An error has happened while deleting table' });
        return next(null, { success: true, result: result, message: '¡Enfermedad eliminada!' });
    });
};

Enfermedad.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else 
        res.status(200).json(data);
};

module.exports = Enfermedad;