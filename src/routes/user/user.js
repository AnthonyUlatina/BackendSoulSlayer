const { Router } = require('express');
const router = Router();
const userController = require('../../controllers/UserController');

//Add user
router.post('/user/add', userController.insertUser);

//Get user for email
router.get('/user/:email', userController.getUserForEmail);

router.get('/user/id/:id', userController.getUserForId);

module.exports = router;