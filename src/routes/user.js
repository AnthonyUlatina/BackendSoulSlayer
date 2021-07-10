const { Router } = require('express');
const router = Router();
const pool = require('../database');

//List users
router.get('/users', async(req, res) => {

    await pool.query("SELECT * FROM user", function(err, values) {
        if (err) {
            console.log(err);
            res.json({ "error": err["sqlMessage"] });
        } else {
            console.log("Se encontranron datos");
            res.json(values);
        }
    });

});

//Add user
router.post('/add', async(req, res) => {

    const { email, password } = req.body;
    const userObject = { "email": email, "password": password };

    await pool.query('INSERT INTO user set ?', [userObject], function(err, result) {
        if (err) {
            console.log(err);
            res.json({ "error": err["sqlMessage"] })
        } else {
            console.log(result);
            res.json({ "message": "Se insertó el usuario correctamente" });
        }
    });

});

router.get('/user/:email', async(req, res) => {

    const { email } = req.body;

    await pool.query('SELECT * FROM user WHERE email = ?', [email], function(err, result) {
        if (err) {
            console.log(err);
            res.json({ "error": "User don't exist" })
        } else {
            console.log(result);
            res.json({ "message": "User exist" });
        }
    });

});

module.exports = router;