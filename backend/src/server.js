const express = require('express');
const bodyParser = require('body-parser');

const proveedorRoutes = require('./routes/proveedor.routes');

const app = express();

app.set('port', process.env.PORT || 3000)

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(proveedorRoutes);

module.exports = app;