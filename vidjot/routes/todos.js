const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

module.exports = router;

// Load Todo Model
require('../models/Todo');
const Todo = mongoose.model('todos');

// Todo's Index Page
router.get('/', (req, res) => {
    Todo.find({})
        .sort({ created: 'descending' })
        .then(todos => {
            res.render('todos/index', {
                todos: todos
            });
        });
});

// Add Todo Form
router.get('/add', (req, res) => {
    res.render('todos/add');
});

// Edit Todo form
router.get('/edit/:id', (req, res) => {
    Todo.findOne({
        _id: req.params.id
    })
        .then(todo => {
            res.render('todos/edit', {
                todo: todo
            });
        });
});

//Process Form
router.post('/', (req, res) => {
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
                req.flash('success_msg', `ToDo ${todo.title} Added`);
                res.redirect('/todos');
            });
    };
});

// Edit Todo Form
router.put('/:id', (req, res) => {
    Todo.findOne({
        _id: req.params.id
    })
        .then(todo => {
            todo.title = req.body.title;
            todo.task = req.body.task;

            todo.save()
                .then(todo => {
                    req.flash('success_msg', `ToDo ${todo.title} Updated`);
                    res.redirect('/todos');
                })
        })
});

// Delete Todo Form
router.delete('/:id', (req, res) => {
    Todo.remove({
        _id: req.params.id
    })
        .then(() => {
            req.flash('success_msg', 'ToDo Removed');
            res.redirect('/todos');
        });
});