const express = require("express");
const router = express.Router();
const moment = require("moment")

router.get("/", (req, res, next) => {
	req.session.LoggedIn = false;
	res.render("login");
});

router.post("/", (req, res, next) => {
        var email = req.body.email;
		var password = req.body.password;
		var lastLogin = moment().format(("YYYY-MM-DD HH:mm:ss"))
        if (email && password) {
		db.query('SELECT * FROM users WHERE user_email = ? AND user_password = ?',
		 [email, password], function(error, results, fields) {
			if (results.length > 0) {
				req.session.LoggedIn = true;
				req.session.email = email;
				req.session.user_id = results[0].user_id;
				user_id = req.session.user_id;
				console.log(results);
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
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		req.session.LoggedIn = false;
		req.session.destroy();
		res.end();
}});


module.exports = router;