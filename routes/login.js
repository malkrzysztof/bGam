const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
	req.session.LoggedIn = false;
	console.log('From login1 function: ' + req.session.LoggedIn)
	res.render("login");
});

router.post("/", (req, res, next) => {
        var email = req.body.email;
		var password = req.body.password;
        if (email && password) {
		db.query('SELECT * FROM users WHERE user_email = ? AND user_password = ?', [email, password], function(error, results, fields) {
			if (results.length > 0) {
				sess = req.session;
				req.session.LoggedIn = true;
				req.session.email = email;
				req.session.char_id = results[0].user_id;
				res.redirect('/');
			} else {
				res.send('Incorrect Username and/or Password!');
				req.session.LoggedIn = false;
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		req.session.LoggedIn = false;
		req.session.destroy();
		res.end();
}});


module.exports = router;