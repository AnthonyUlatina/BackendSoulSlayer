const { Router } = require('express');
const router = Router();
const gameController = require('../../controllers/GameController');

router.post('/game/add', gameController.createNewGame);

router.post('/game/user_has_game/add', gameController.createNewUserHasGame);

router.get('/game/id_user=:id_user&id_game=:id_game', gameController.getGameOfUser);
router.get('/game/id_user=:id_user', gameController.getGameOfUserOne);

router.patch('/game/update/:id_game', gameController.updateGame);

module.exports = router;