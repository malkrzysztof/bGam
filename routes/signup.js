const express = require("express");
const router = express.Router();
const moment = require("moment");
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
				bcrypt.genSalt(saltRounds, function(err, salt) {
					bcrypt.hash(password, salt, function(err, hash) {
						db.query('INSERT INTO users(user_email, user_password, user_create_date, user_last_login) VALUES(?, ?, ?, ?)',
						[email, hash, createDate, createDate], function(err,results, fields){
							if (err){throw err}
							console.log('Create ' + email + ' at ' + createDate)
							// console.log(results.insertId)
							userID = results.insertId
							startingHelmet();
							startingArmor();
							startingLegs();
							startingWaepon();
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
							);
						})
					})
					})
			}})} else {
				res.send("Please enter Username, Password and Character name!")
			}
	});

function startingHelmet() {
	db.query('INSERT INTO helmet(user_id, item_name, physical_armor, energy_armor)' +
				'values(?, "Czapka", 2, 2)', [userID])
};

function startingArmor() {
	db.query('INSERT INTO armor(user_id, item_name, physical_armor, energy_armor)' +
				'values(?, "Koszula", 4, 4)', [userID])
};

function startingLegs() {
	db.query('INSERT INTO legs(user_id, item_name, physical_armor, energy_armor)' +
				'values(?, "Trzewiki", 1, 1)', [userID])
};

function startingWaepon() {
	db.query('INSERT INTO waepon(user_id, item_name, physical_dmg, energy_dmg)' +
				'values(?, "Kij", 3, 0)', [userID])
};


module.exports = router;

