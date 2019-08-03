const express = require("express");
const router = express.Router();
const moment = require("moment")

router.get("/", (req, res, next) => {
	req.session.LoggedIn = false;
	res.render("signup");
});

router.post("/", (req, res, next) => {
	var email = req.body.email;
	var charName = req.body.charName;
	var password = req.body.password;
	createDate = moment().format(("YYYY-MM-DD HH:mm:ss"))

	sql = 'SELECT * FROM users WHERE user_email = ?;' + 
			'SELECT * FROM characters WHERE char_name = ?'

	if (email && password && charName) {
		db.query(sql, [email, charName], function(err, results, fields) {
			JSON.stringify(results)
			// console.log(results[0])
			// console.log(results[1])
			if (results[0] != 0 || results[1] != 0){
				console.log("have email or char name")
				res.send("Email or character name already in use!")
			} else {
				db.query('INSERT INTO users(user_email, user_password, user_create_date, user_last_login) VALUES(?, ?, ?, ?)',
				[email, password, createDate, createDate], function(err,results, fields){
					if (err){throw err}
					console.log('Create ' + email + ' at ' + createDate)
					// console.log(results.insertId)
					userID = results.insertId
					db.query('INSERT INTO ' +
						 'characters(user_id, char_name, char_moves, char_hp, char_str, char_dex, char_int, char_vit) ' +
						 'value(?, ?, 99, 25, 10, 10, 10, 10)', [userID, charName],
						function(err, results, fields){
							if (err){
								db.query('DELETE * FROM users WHERE user_id = ?' [userID], function (err,results){
									if (err) {
										throw err
									} else {
										res.send("Something goes wrong, please try again!")
									}
								})
							} else {
								res.redirect("/login")
							}
						}
					)
				})
			}
		});
	} else {
		res.send("Please enter Username, Password and Character name!")
	}
});




module.exports = router;

function newFunction(results) {
	return results[0].email;
}
