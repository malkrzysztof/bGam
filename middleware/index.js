const express = require('express');
const app     = express();
const session  = require('express-session');

module.exports = {
    isLoggedIn: function(req, res, next){
        if(req.session.LoggedIn = true && req.session.email){
           return next();
        } else {
            res.redirect('/login');
            req.session.LoggedIn = false;
        }
    }
}
