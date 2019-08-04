const express = require("express");
const router = express.Router();
const moment = require("moment");
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get("/", (req, res, next) => {
	req.session.LoggedIn = false;
	res.render("login");
});

router.post("/", (req, res, next) => {
	var email = req.body.email;
	var password = req.body.password;
	var lastLogin = moment().format(("YYYY-MM-DD HH:mm:ss"))
	if (email && password) {
		db.query('SELECT * FROM users WHERE user_email = ?',[email], function(error, results, fields) {
			if (results.length > 0) {
				var dbPass = results[0].user_password;
				req.session.user_id = results[0].user_id;
				user_id = req.session.user_id;
				bcrypt.compare(password, dbPass, function (err, results){
					if (results == true){
						req.session.LoggedIn = true;
						req.session.email = email;
							db.query('UPDATE users SET user_last_login = ? WHERE user_id = ?',
							[lastLogin, user_id], function(error, results){
								if (error){
									throw error
								}
							});
						res.redirect('/');
					} else {
						res.send('Incorrect Username and/or Password!');
						req.session.LoggedIn = false;
					}
				});
			} else {
				res.send('User email not found!');
				req.session.LoggedIn = false;
			}
		})
	} else {
		res.send('Please enter Username and Password!');
		req.session.LoggedIn = false;
		req.session.destroy();
		res.end();
	}
});

module.exports = router;