const connection = require('../config/db-connection');

const Persona = {};

Persona.all = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM persona', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Persona.findById = (PersonaId, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM persona WHERE idPersona = ?',
    [PersonaId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Persona.count = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`SELECT COUNT(idPersona) AS count FROM persona`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Persona.exist = (PersonaId, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT EXISTS(SELECT 1 FROM persona WHERE idPersona = ?) AS exist', [PersonaId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Persona.insert = (Persona, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`INSERT INTO persona SET ?`, [Persona], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Persona.update = (Persona, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('UPDATE persona SET ? WHERE idPersona = ?', [Persona, Persona.idPersona], (error, result) => {
        if ( error )
            return next({ success: false, error: error });
        else
            return next( null, { success: true, result: result});
    });
};

Persona.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Persona;
