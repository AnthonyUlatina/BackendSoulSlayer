const { Router } = require('express');
const router = Router();
const passport = require('passport');
const user = require('../user');
require('./auth');

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

//Auth google oauth2
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));


//
router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: "/successfull",
    failureRedirect: '/failed'
}));

//Successfull message
router.get('/successfull', isLoggedIn, (req, res) => {



    res.json({ "message": `Hello ${req.user.email}` });

});

//Error in loggin
router.get('/failed', (req, res) => {
    res.json({ "message": "Error!" });
});

router.get('/logout', (req, res) => {

    req.logOut();
    req.session.destroy();

    res.json({ "message": "Good bye" });
});

module.exports = router;