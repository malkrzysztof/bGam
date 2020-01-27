const express = require("express");
const router = express.Router();
const moment = require('moment')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = '1234';
const someOtherPlaintextPassword = 'not_bacon';
const middleware = require("../middleware/middleware");

// var mob = {}
// var char = {}

router.get("/", middleware.isLoggedIn, (req, res) => {
    let sql = "SELECT * FROM `6687_bgame`.`characters` WHERE user_id="+ user_id +";" + 
    "SELECT * FROM `6687_bgame`.`waepon` WHERE user_id="+ user_id +";" +
    "SELECT * FROM `6687_bgame`.`armor` WHERE user_id="+ user_id +";" +
    "SELECT * FROM `6687_bgame`.`helmet` WHERE user_id="+ user_id +";" +
    "SELECT * FROM `6687_bgame`.`legs` WHERE user_id="+ user_id +";" +
    "SELECT * FROM `6687_bgame`.`mob` WHERE mob_name='"+ mobName +"';"



    var mobName = req.param.mobName
    user_id = req.session.user_id
    email = req.session.email

    dane();

    async function dane() {
        console.log('test pobieram');
        const data = await pobierzDane();
        console.log('test pobrane')
        res.render("fight", {char: data[0],
                            waepon: data[1],
                            armor: data[2],
                            helmet: data[3],
                            legs: data[4],
                            mob: data[5]
        });
        char = data[0]
        waepon = data[1]
        armor = data[2]
        helmet = data[3]
        legs = data[4]
        mob = data[5]
        middleware.whoStart()
    };


        function pobierzDane() {
            return new Promise(resolve => {
                db.query(sql, function (err, results){
                    if (err) {
                        throw err;
                    } else {
                        resolve(results)
                    }
                })
            });
        };

});

module.exports = router;