const bycript = require('bcryptjs');
const helpers = {};

//Password encrypt
helpers.encryptPassword = async (password) => {

    const salt = await bycript.genSalt(10);
    const hash = await bycript.hash(password, salt);

    return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
    try {
        return await bycript.compare(password, savedPassword);
    } catch (error) {
        console.log(error);
    }
};

helpers.generatePassword = async () => {

    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    var pass = "";
    for (i = 0; i < characters.length; i++) {
        pass += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return pass;

};

module.exports = helpers;