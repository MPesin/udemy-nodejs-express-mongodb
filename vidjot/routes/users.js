const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

module.exports = router;

// User Login Route
router.get('/login', (req, res) =>{
    res.render('users/login');
});

// User Register Route
router.get('/register', (req, res) =>{
    res.render('users/register');
});

// Register Form Post
router.post('/register', (req, res) => {
    let errors = [];
    if (req.body.password != req.body.passwordC){
        errors.push({text: 'Passwords Do Not Match'});
    }
});