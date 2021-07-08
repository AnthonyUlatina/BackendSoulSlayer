const express = require('express');
const morgan = require('morgan');
const path = require('path');
//inicializacion
const app = express();

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

//Global variables
app.use((req, res, next) => {
    next();
});

//public
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/user'));

//Inicia el server
app.listen(3000, () => {
    console.log('Server en el puerto', 3000);
});