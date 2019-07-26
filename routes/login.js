const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
        res.render("login");
});

router.post("/", (req, res, next) => {
        var email = req.body.email;
		var password = req.body.password;
		console.log(req.body.email)
        if (email && password) {
		db.query('SELECT * FROM users WHERE user_email = ? AND user_password = ?', [email, password], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.email = email;
				res.redirect('/');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!' + req.body.email);
		res.end();
}});

module.exports = router;