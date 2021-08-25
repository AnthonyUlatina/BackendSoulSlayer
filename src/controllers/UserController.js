const pool = require('../database/database');
const helpers = require('../lib/helpers');
const axios = require('axios');

exports.getAllUsers = async (req, res) => {

    await pool.query('SELECT * FROM user', function (err, result) {

        if (err) {
            res.send(err);
        } else {

            if (err) {
                res.json({ "error": err["sqlMessage"] });
            } else {

                if (result.length === 0) {
                    res.status(404).json({ "message": "Not found users" });
                } else {
                    res.json(result);
                }


            }
        }

    });

};


exports.getUserForEmail = async (req, res) => {

    const { email } = req.params;

    await pool.query('SELECT * FROM user WHERE email = ?', [email], function (err, result) {

        if (err) {
            res.json({ "message": err["sqlMessage"] });
        } else {

            if (result.length === 0) {
                res.status(404).json({ "message": "User don't exist" });
            } else {

                res.json(result[0]);
            }

        }

    });

};

exports.insertUser = async (req, res) => {

    const { email, password } = req.body;

    const userObject = { "email": email, "password": password };

    userObject.password = await helpers.encryptPassword(password);

    await pool.query('INSERT INTO user set ?', [userObject], function (err, result) {
        if (err) {
            console.log(err["sqlMessage"]);
            res.json({ "message": err["sqlMessage"] })
        } else {
            res.json({ "message": "Insert user successfull", "user": `${userObject.email}` });
        }
    });

};

//Get user for email and password
exports.getUserEmailPassword = async (req, res) => {

    const { email, password } = req.body;

    console.log(req.body);

    const userData = { "email": email, "password": password };

    await pool.query('SELECT id, email,password FROM user WHERE email = ?', [userData.email], async function (err, result) {

        if (err) {
            console.log(err['sqlMessage']);
            res.json({ "message": err['sqlMessage'] });
        } else {

            if (result !== null) {
                const userDataBase = result[0];

                if (userDataBase === undefined) {
                    res.json({ "message": "Email or password is incorrect", "user": null });
                } else {

                    const validPassword = await helpers.matchPassword(userData.password, userDataBase.password);

                    if (validPassword) {
                        console.log(userDataBase);
                        res.json({ "message": `Welcome to SoulSlayer ${userDataBase.email}`, "user": userDataBase });
                    } else {
                        res.json({ "message": "Invalid password", "user": null });
                    }
                }

            } else {
                res.json({ "message": "Password or email is incorrect" });
            }

        }

    });

};

exports.getUserForEmailParam = async (email) => {
    try {
        const response = await axios({
            method: 'get',
            url: `http://localhost:4000/user/${email}`,
            responseType: 'json'
        });
        return response.data;
    } catch (error) {
        return null;
    }
};

exports.insertUserParam = async (email, password) => {
    try {
        const response = await axios({
            method: 'post',
            url: `http://localhost:4000/user/add`,
            responseType: 'json',
            data: { "email": email, "password": password }
        });
        return response.data;
    } catch (error) {
        return null;
    }
};

exports.getUserForId = async (req, res) => {

    const { id } = req.params;

    await pool.query('SELECT * FROM user WHERE id = ?', [id], function (err, result) {

        if (err) {
            res.json({ "message": err["sqlMessage"] });
        } else {

            console.log(result);

            if (result.length === 0) {
                res.json({ "message": "Not found user", "user": null });
            } else {

                res.json({ "message": `Welcome to SoulSlayer ${result[0].email}`, "user": result[0] });
            }

        }

    });

};

