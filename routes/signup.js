const express = require("express");
const router = express.Router();
const moment = require("moment")

router.get("/", (req, res, next) => {
	req.session.LoggedIn = false;
	res.render("signup");
});

router.post("/", (req, res, next) => {
	var email = req.body.email;
	var password = req.body.password;
	createDate = moment().format("YYYY-MM-DD HH:MM")
	if (email && password) {
		db.query('SELECT * FROM users WHERE user_email = ?',
		 [email], function(err, results, fields) {
			if (results[0]){
				console.log("have email")
				res.send("Email already in use!")
			} else {
				db.query('INSERT INTO users(user_email, user_password, user_create_date, user_last_login) VALUES(?, ?, ?, ?)',
				[email, password, createDate, createDate], function(err,results, fields){
					if (err){throw err}
					console.log('Create ' + email + ' at ' + createDate)
					res.redirect("/login")
				})
			}
		});
	} else {
		res.send("Please enter Username and Password!")
	}
});

module.exports = router;