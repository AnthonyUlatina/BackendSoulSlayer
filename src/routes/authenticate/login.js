const { Router } = require('express');
const router = Router();
//const passport = require('passport');
const userController = require('../../controllers/UserController');

//require('./auth');

/*function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

//Auth google oauth2
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

//If is valid email send to successfull
router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/successfull',
    failureRedirect: '/failed',
}));

//Successfull message
router.get('/successfull', isLoggedIn, async (req, res) => {
    console.log(res.req.user.email);
    res.json({ "message": `Wellcome ${res.req.user.email}`});
});

//Error in loggin
router.get('/failed', (req, res) => {
    res.json({ "message": "Error!" });
});

router.get('/auth/logout', isLoggedIn, (req, res) => {
    req.logOut();
    req.session.destroy();
    res.redirect("/auth/google");
});

const getUserForEmail = async (email) => {
    return await userController.getUserForEmailParam(email);
};

//Add user
router.post('/user/add', userController.insertUser);*/

router.post('/auth/login', userController.getUserEmailPassword);



module.exports = router;