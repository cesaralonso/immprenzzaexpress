const connection = require('../config/db-connection');

const Personal = {};

Personal.all = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM personal HAVING baja IS NULL OR baja = false', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Personal.findById = (PersonalId, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM personal WHERE idPersonal = ? HAVING baja IS NULL OR baja = false',
    [PersonalId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Personal.count = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`SELECT COUNT(idPersonal) AS count FROM personal`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Personal.exist = (PersonalId, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT EXISTS(SELECT 1 FROM personal WHERE idPersonal = ?) AS exist', [PersonalId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Personal.insert = (Personal, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`INSERT INTO personal SET ?`, [Personal], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo' })
        else
            return next( null, { success: true, result: result, message: 'Registro agregado correctamente' });
    });
};

Personal.update = (Personal, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('UPDATE personal SET ? WHERE idPersonal = ?', [Personal, Personal.idPersonal], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo'});
        else
            return next( null, { success: true, result: result, message: 'Datos actualizados'});
    });
};

Personal.logicRemove = (personalId, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('UPDATE personal SET baja = 1 WHERE idPersonal = ?', [personalId], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al eliminar este registro' });
        else
            return next( null, { success: true, result: result, message: 'Personal eliminado' });
    });
};

Personal.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Personal;
