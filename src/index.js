const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const MYSQLStore = require('express-mysql-session');
const { database } = require('./database/keys');
const passport = require('passport');

//inicializacion
const app = express();

//Middleware
app.use(session({
    secret: 'SoulSlayerGame',
    resave: false,
    saveUninitialized: false,
    store: new MYSQLStore(database)
}));
app.use(passport.initialize());
app.use(passport.session());
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
app.use(require('./routes/user/user'));
app.use(require('./routes/authenticate/login'));
app.use(require('./routes/game/game'));

//Inicia el server
app.listen(3000, () => {
    console.log('Server on port 3000', 3000);
});