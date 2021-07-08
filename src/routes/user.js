const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/users', async (req, res) => {

    let valuesReturn = null;

    await pool.query("SELECT * FROM user", function (err, values) {
        if (err) {
            console.log(err);
            res.json({"error": err["sqlMessage"]});
        } else {
            console.log("Se encontranron datos");
            res.json(values);
        }
    });



});

router.post('/add', async (req, res) => {
    const { email, password } = req.body;
    const userObject = { "email": email, "password": password };

    await pool.query('INSERT INTO user set ?', [userObject], function (err, result) {
        if (err) {
            console.log(err);
            res.json({"error": err["sqlMessage"]})
        } else {
            console.log(result);
            res.json({"message": "Se insertó el usuario correctamente"});
        }
    });


});

module.exports = router;