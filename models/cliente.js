const connection = require('../config/db-connection');

const Cliente = {};

Cliente.all = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM cliente', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Cliente.findById = (ClienteId, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM cliente WHERE idCliente = ?',
    [ClienteId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Cliente.count = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`SELECT COUNT(idCliente) AS count FROM cliente`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Cliente.exist = (ClienteId, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT EXISTS(SELECT 1 FROM cliente WHERE idCliente = ?) AS exist', [ClienteId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Cliente.insert = (Cliente, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`INSERT INTO cliente SET ?`, [Cliente], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Cliente.update = (Cliente, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('UPDATE cliente SET ? WHERE idCliente = ?', [Cliente, Cliente.idCliente], (error, result) => {
        if ( error )
            return next({ success: false, error: error });
        else
            return next( null, { success: true, result: result});
    });
};

Cliente.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Cliente;
