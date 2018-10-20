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
    created:{
        type: Date,
        default: Date.now
    }
});

mongoose.model('todo', TodoSchema);