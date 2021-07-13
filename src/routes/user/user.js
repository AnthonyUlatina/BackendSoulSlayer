const { Router } = require('express');
const router = Router();
const userController = require('../../controllers/UserController');

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

//Get list users
router.get('/users', userController.getAllUsers);

//Add user
router.post('/user/add', userController.insertUser);

//Get user for email
router.get("/user/:email", userController.getUserForEmail);

module.exports = router;