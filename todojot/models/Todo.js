const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TodoSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    task:{
        type: String
    },
    user:{
        type: String,
        required: true
    },
    created:{
        type: Date,
        default: Date.now
    }
});

mongoose.model('todos', TodoSchema);