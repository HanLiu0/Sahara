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
            }
            mysql.getUserByUsername(req.body.username, function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, {message: 'That username is already taken.'});
                }
                mysql.addUser(req.body.username, email, password, req, function (err, rows) {
                    mysql.getUserByEmail(email, function (err, rows) {
                        return done(null, rows[0]);
                    });
                });
            });
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
            else if (!rows.length) {
                mysql.getUserByUsername(email,function(err,rows){
                    if(!rows.length)
                        return done(null, false,{message: 'No user found.'});
                    else{
                        if (!( rows[0]['Password'] === password))
                            return done(null, false, {message: 'Wrong password.'});
                        else {
                            return done(null, rows[0]);
                        }
                    }
                });
            }else if (!(rows[0]['Password'] === password)){
                    return done(null, false, {message: 'Wrong password.'});
            }
            else{
                return done(null, rows[0]);
            }
        });
    }));
