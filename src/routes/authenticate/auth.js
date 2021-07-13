const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const userController = require('../../controllers/UserController');

//const GOOGLE_CLIENT_ID = '559256041626-vt86to0ftet2gprlq6gmo9doeoqkbh39.apps.googleusercontent.com';
//const GOOGLE_CLIENT_SECRET = '7ZAhqNU7grFsGHYTPPU7l0-n';

const GOOGLE_CLIENT_ID = '559256041626-q3sgaujr93mmf2fjvih4d3k4epp5bmv9.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'w3Q4V3NKtKGtCJ86DgnmeLk5';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback",
    passReqToCallback: true
}, async function (request, accessToken, refreshToken, profile, done) {

    //If user dont exist will be create
    let user = await userController.getUserForEmailParam(profile.email);

    if (user === null) {
        await userController.insertUserParam(profile.email);
    }

    return await done(null, profile);
}));


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
