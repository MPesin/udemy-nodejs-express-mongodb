const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User model
const User = mongoose.model('users');

module.exports = function (passport) {
    // console.log('Enter Passport');
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        // DEBUG: console.log(email);
        User.findOne({
            email:email
        }).then(user => {
            // DEBUG: console.log('Found user ' + user.email);
            if (!user) {
                return done(null, false, { message: 'No Such User' });
            }
            // Match Password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                // DEBUG: console.log('No errors - isMatch = ' + isMatch);
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Wrong Password' });
                }
            });
        })
    }));

    passport.serializeUser(function (user, done) {
        // DEBUG: console.log('Enter passport.serializeUser');
        done(null, user.id);
        // DEBUG:
        console.log('serializeUser');
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
            // DEBUG:
            console.log('deserializeUser');
        });
    });
}