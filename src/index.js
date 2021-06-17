const express = require('express');

//inicializacion
const app = express();

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.use(require('./routes/index'));

//Inicia el server
app.listen(3000, () => {
    console.log('Server en el puerto', 3000);
});
