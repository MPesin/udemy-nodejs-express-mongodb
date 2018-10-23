const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

// Load Routes
const todos = require('./routes/todos');
const users = require('./routes/users');

// Passport Config
require('./config/passport')(passport);

// Connect to Mongoose
mongoose.connect('mongodb://localhost/todo-dev', {
    useNewUrlParser: true
})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Middleware
app.use(function (req, res, next) {
    req.name = 'Michael Pesin';
    next();
});

// Body parse middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Methode override middleware: override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Express Session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

// Connect Flash middleware
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Global Variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Index Route
app.get('/', (req, res) => {
    const title = "Hello There";
    console.log(req.name);
    res.render('index', {
        title: title
    });
});

// About Route
app.get('/about', (req, res) => {
    res.render('about');
});

// Use Routes
app.use('/todos', todos);
app.use('/users', users);

const port = 5000;

//  Listen
app.listen(port, () => {
    console.log(`Server started on ${port}`);
});