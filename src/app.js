const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();

const restauranteRoute = require("./routes/restaurante.routes");
const platoRoute = require("./routes/plato.routes");
const clienteRoute = require("./routes/cliente.routes");
const compraRoute = require("./routes/compra.routes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

//Configure Header HTTP
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });
  //----
  
//Router Basic
app.use(`/api/`, restauranteRoute);
app.use(`/api/`, platoRoute);
app.use(`/api/`, clienteRoute);
app.use(`/api/`, compraRoute);

module.exports = app;
  