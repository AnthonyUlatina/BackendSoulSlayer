const pool = require('../database/database');
const helpers = require('../lib/helpers');

exports.createNewGame = async (req, res) => {

    const { levelGame, souls, weapon_level, health, special_ability_bar, character } = req.body;

    const gameObject = {
        "levelGame": levelGame,
        "souls": souls,
        "weapon_level": weapon_level,
        "health": health,
        "special_ability_bar": special_ability_bar,
        "character": character
    };

    await pool.query('INSERT INTO game set ?', [gameObject], function (err, result) {
        if (err) {
            console.log(err["sqlMessage"]);
            res.json({ "message": err["sqlMessage"], "id_game": null });
        } else {
            res.json({ "message": "Game created", "id_game": `${result.insertId}` });
        }
    });

};

exports.createNewUserHasGame = async (req, res) => {

    const { id_user, id_game, } = req.body;

    const userHasGameObject = {
        "id_user": id_user,
        "id_game": id_game,
    };

    await pool.query('INSERT INTO user_has_game set ?', [userHasGameObject], function (err, result) {
        if (err) {
            console.log(err["sqlMessage"]);
            res.json({ "message": err["sqlMessage"] });
        } else {
            console.log(result);
            res.json({ "message": "User has game created" });
        }
    });

};

exports.getGameOfUser = async (req, res) => {

    const { id_user, id_game } = req.params;

    await pool.query('SELECT game.id_game, game.levelGame, game.souls, game.weapon_level, game.health, game.special_ability_bar FROM soulslayer.game, soulslayer.user, soulslayer.user_has_game WHERE user.id = user_has_game.id_user AND user.id = ? AND game.id_game = user_has_game.id_game AND game.id_game = ?', [id_user, id_game], function (err, result) {

        if (err) {
            res.json(err);
        } else {

            if (err) {
                res.json({ "message": err["sqlMessage"], "game": null });
            } else {

                if (result.length === 0) {
                    res.status(404).json({ "message": "Game not found", "game": null });
                } else {
                    res.json({ "message": "Game found", "game": result[0] });
                }

            }
        }

    });

};

exports.getGameOfUserOne = async (req, res) => {

    const { id_user } = req.params;

    await pool.query('SELECT game.id_game, game.levelGame, game.souls, game.weapon_level, game.health, game.special_ability_bar, game.character FROM soulslayer.game, soulslayer.user, soulslayer.user_has_game WHERE user.id = user_has_game.id_user AND user.id = ? AND game.id_game = user_has_game.id_game', [id_user], function (err, result) {

        if (err) {
            res.json(err);
        } else {

            if (err) {
                res.json({ "message": err["sqlMessage"], "game": null });
            } else {

                if (result.length === 0) {
                    res.status(404).json({ "message": "Game not found", "game": null });
                } else {
                    res.json({ "message": "Game found", "game": result[0] });
                }

            }
        }

    });
};

exports.updateGame = async (req, res) => {

    
    const { levelGame, souls, weapon_level, health, special_ability_bar, character } = req.body;

    const gameObject = {
        "levelGame": levelGame,
        "souls": souls,
        "weapon_level": weapon_level,
        "health": health,
        "special_ability_bar": special_ability_bar,
        "character": character
    };

    await pool.query('UPDATE game set ? WHERE id_game = ?', [gameObject, req.params.id_game], function (err, result) {
        if (err) {
            console.log(err["sqlMessage"]);
            res.json({ "message": err["sqlMessage"]});
        } else {
            console.log(result);
            res.json({ "message": "Game updated"});
        }
    });

};