const { Router } = require('express');
const router = Router();
const gameController = require('../../controllers/GameController');

router.post('/game/add', gameController.createNewGame);

router.post('/game/user_has_game/add', gameController.createNewUserHasGame);

router.get('/game/id_user=:id_user&id_game=:id_game', gameController.getGameOfUser);

module.exports = router;