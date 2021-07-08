const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/users', async(req, res) => {

    const listUsers = await pool.query("SELECT * FROM user");

    console.log(listUsers);

});

router.post('/add', async(req, res) => {
    const { email, password } = req.body;

    const userObject = { email, password };

    console.log(userObject);

    await pool.query('INSERT INTO user set ?', [userObject]);

    res.send('User insert');
});

module.exports = router;