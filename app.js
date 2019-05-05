var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var logger = require('morgan');
var expressHbs = require('express-handlebars');
var session = require('express-session');
var flash = require('connect-flash');
var fileUpload = require('express-fileupload');


require('./config/passport');

var indexRouter = require('./routes/index');
var shoppingCartRouter = require('./routes/shopping_cart');
var signinRouter = require('./routes/user/signin');
var signupRouter = require('./routes/user/signup');
var userRouter = require('./routes/user/user');
var checkoutRouter = require('./routes/checkout');
var itemRouter = require('./routes/item');
var viewRouter = require('./routes/view');
var sellerRouter = require('./routes/seller');
var aboutRouterAndContact = require('./routes/about_and_contact');
var app = express();

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs',
    helpers: require("./public/javascripts/helpers.js").helpers}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());

app.use(function(req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});

app.use('/', indexRouter);
app.use('/shopping_cart', shoppingCartRouter);
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);
app.use('/user', userRouter);
app.use('/checkout', checkoutRouter);
app.use('/item', itemRouter);
app.use('/view', viewRouter);
app.use('/seller', sellerRouter);
app.use('/about_and_contact', aboutRouterAndContact);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in developmen
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
