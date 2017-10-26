const express = require('express');
const connection = require('./config/db-connection');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

//Route importation.
const rol = require('./routes/roles');
const user = require('./routes/users');
const pago = require('./routes/pagos');
const combo = require('./routes/combos');
const orden = require('./routes/ordenes');
const oferta = require('./routes/ofertas');
const estado = require('./routes/estados');
const ciudad = require('./routes/ciudades');
const horario = require('./routes/horarios');
const factura = require('./routes/facturas');
const telefono = require('./routes/telefonos');
const platillo = require('./routes/platillos');
const direccion = require('./routes/direcciones');
const tipoComida = require('./routes/tipoComidas');
const enfermedad = require('./routes/enfermedades');
const ingrediente = require('./routes/ingredientes');
const restaurante = require('./routes/restaurantes');
const platilloOrdenado = require('./routes/platillosOrdenados');
const restaurantePlatillo = require('./routes/restaurantesPlatillos');

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
app.use('/pago', pago);
app.use('/orden', orden);
app.use('/combo', combo);
app.use('/oferta', oferta);
app.use('/estado', estado);
app.use('/ciudad', ciudad);
app.use('/horario', horario);
app.use('/factura', factura);
app.use('/telefono', telefono);
app.use('/platillo', platillo);
app.use('/direccion', direccion);
app.use('/enfermedad', enfermedad);
app.use('/tipoComida', tipoComida);
app.use('/ingrediente', ingrediente);
app.use('/restaurante', restaurante);
app.use('/platilloOrdenado', platilloOrdenado);
app.use('/restaurantePlatillo', restaurantePlatillo);

// Set port
app.listen(3000);



