const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = '559256041626-vt86to0ftet2gprlq6gmo9doeoqkbh39.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '7ZAhqNU7grFsGHYTPPU7l0-n';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback",
    passReqToCallback: true
}, function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});