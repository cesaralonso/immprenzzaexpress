const express = require('express');
const connection = require('./config/db-connection');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');


//Route importation.
const rol = require('./routes/roles');
const user = require('./routes/users');
const modulo = require('./routes/modulos');
const permiso = require('./routes/permisos');
const orden = require('./routes/ordenes');
const personal = require('./routes/empleados');
const persona = require('./routes/personas');
const puesto = require('./routes/puestos');
const checkout = require('./routes/checkouts');
const trabajo = require('./routes/trabajos');
const tipotrabajo = require('./routes/tipotrabajos');
const abono = require('./routes/abonos');
const cliente = require('./routes/clientes');

// Express Instance
const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());



// Initialize passport
app.use(passport.initialize());

// Call passport Strategy
require('./config/passport')(passport);

// Warehouses
app.use('/rol', rol);
app.use('/user', user);
app.use('/modulo', modulo);
app.use('/orden', orden);
app.use('/permiso', permiso);
app.use('/personal', personal);
app.use('/persona', persona);
app.use('/puesto', puesto);
app.use('/checkout', checkout);
app.use('/trabajo', trabajo);
app.use('/tipotrabajo', tipotrabajo);
app.use('/abono', abono);
app.use('/cliente',cliente);

// Set port
app.listen(3001);
