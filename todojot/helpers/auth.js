module.exports = {
    ensureAuthenticated: function(req, res, next){
        if (req.isAuthenticated()){
            // DEBUG:
            console.log('req.isAuthenticated() = true');
            return next();
        }
        req.flash('error_msg', 'Please Login');
        res.redirect('/users/login');
    }
}