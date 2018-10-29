if(process.env.NODE_END === 'production'){
    module.exports = {
        mongoURI: 'mongodb://pesin:pex21mp12@ds145083.mlab.com:45083/todojot-prod'
    }
} else {
    module.exports = {
        mongoURI: 'mongodb://localhost/todo-dev'
    }
}