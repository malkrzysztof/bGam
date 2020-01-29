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
    },
    whoStart: function() {
        mobStart = Math.floor(Math.random() * (10 - 1 + 1) + 1)
        charStart = Math.floor(Math.random() * (10 - 1 + 1) + 1)
        function retry() {
            if (mobStart == charStart) {
                mobStart = Math.floor(Math.random() * (10 - 1 + 1) + 1)
                charStart = Math.floor(Math.random() * (10 - 1 + 1) + 1)
            }
        }
        retry();
        // console.log("Mob Start: " + mobStart)
        // console.log("Char Start: " + charStart)
    }
}
