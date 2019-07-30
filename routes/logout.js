const express = require("express");
const session  = require('express-session');
const router = express.Router();

router.get("/", function(req, res){
    req.session.LoggedIn = false;
    console.log('From logout function: ' + req.session.LoggedIn)
    req.session.destroy(function(err) {
        return res.redirect(302, '/login');
    });
 });

 module.exports = router;