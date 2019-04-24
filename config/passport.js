var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mysql = require('../database/mysqlLib');

passport.serializeUser(function (user, done) {
    done(null, user['UserID']);
});

passport.deserializeUser(function (id, done) {
    mysql.getUserByID(id, function (err, user) {
        done(err, user[0]['UserID']);
    });
});


passport.use('local.signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        mysql.getUserByEmail(email,function(err,rows){
            if (err)
                return done(err);
            if (rows.length) {
                return done(null, false, {message : 'That email is already taken.'});
            } else {
                var newUserMysql = new Object();

                newUserMysql.email    = email;
                newUserMysql.password = password;

                mysql.addUser(email, password,function(err,rows){
                    newUserMysql.id = rows[0]['UserID'];
                    return done(null, newUserMysql);
                });
            }
        });
    }));

passport.use('local.signin', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        mysql.getUserByEmail(email,function(err,rows){
            if (err)
                return done(err);
            if (!rows.length) {
                return done(null, false,{message: 'No user found.'});
            }
            if (!( rows[0]['Password'] === password))
                return done(null, false, {message: 'Wrong password.'});

            return done(null, rows[0]);
        });
    }));
