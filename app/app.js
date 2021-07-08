const express=require('express');
const rutasVinos=require('./rutas/rutasVino');
const rutasRefrescos=require('./rutas/rutasRefrescos');
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/vinos',rutasVinos);
app.use('/refrescos',rutasRefrescos);

module.exports = app;
