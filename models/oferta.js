const connection = require('../config/db-connection');

const Oferta = {};

Oferta.all = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM oferta', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Oferta.findById = (ofertaId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM oferta WHERE idoferta = ?', 
        [ofertaId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Oferta.count = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`SELECT COUNT(idoferta) AS count FROM oferta`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Oferta.exist = (ofertaId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT EXISTS(SELECT 1 FROM oferta WHERE idoferta = ?) AS exist', [ofertaId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Oferta.insert = (oferta, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`INSERT INTO oferta SET ?`, [oferta], (error, result) => {
        if ( error ) 
            return next({ success: false, error: error })
        else 
            return next( null, { success: true, result: result });
    });
};

Oferta.update = (oferta, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('UPDATE oferta SET ? WHERE idoferta = ?', [oferta, oferta.idoferta], (error, result) => {
        if ( error )
            return next({ success: false, error: error });
        else
            return next( null, { success: true, result: result});
    });
};

Oferta.remove = (ofertaId, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('DELETE FROM oferta WHERE idoferta = ?', [ofertaId], (error, result) => {
        if(error) return next({ success: false, error: error, message: 'An error has happened while deleting table' });
        return next(null, { success: true, result: result, message: '¡Oferta eliminada!' });
    });
};

Oferta.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else 
        res.status(200).json(data);
};

module.exports = Oferta;