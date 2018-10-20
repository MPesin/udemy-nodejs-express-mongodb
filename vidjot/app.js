const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

// Connect to Mongoose
mongoose.connect('mongodb://localhost/todo-dev', {
    useNewUrlParser: true
})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Load Todo Model
require('./models/Todo');
const Todo = mongoose.model('todo');

// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Middleware
app.use(function (req, res, next) {
    console.log(Date.now());
    req.name = 'Michael Pesin';
    next();
});

// Body parse middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Methode override middleware: override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

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

// Todo's Index Page
app.get('/todos', (req, res) => {
    Todo.find({})
        .sort({ created: 'descending' })
        .then(todos => {
            res.render('todos/index', {
                todos: todos
            });
        });
});

// Add Todo Form
app.get('/todos/add', (req, res) => {
    res.render('todos/add');
});

// Edit Todo form
app.get('/todos/edit/:id', (req, res) => {
    Todo.findOne({
        _id: req.params.id
    })
        .then(todo => {
            res.render('todos/edit', {
                todo:todo
            });
        });
});

//Process Form
app.post('/todos', (req, res) => {
    let errors = [];
    if (!req.body.title) {
        errors.push({ text: 'Please add a title' });
    };

    if (!req.body.task) {
        errors.push({ text: 'Please write the task' });
    };

    if (errors.length > 0) {
        res.render('todos/add', {
            errors: errors,
            title: req.body.title,
            task: req.body.task,
        });
    } else {
        const newUser = {
            title: req.body.title,
            task: req.body.task,
        };
        new Todo(newUser)
            .save()
            .then(todo => {
                res.redirect('/todos');
            });
    };
});

app.put('todos/:id', (req, res) => {
    res.send('PUT');
});

const port = 5000;

//  Listen
app.listen(port, () => {
    console.log(`Server started on ${port}`);
});