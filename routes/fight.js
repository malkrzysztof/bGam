const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const router = express.Router();
const middleware = require("../middleware/middleware");

var mob = {}
var char = {}
var waepon = {}
var armor = {}
var helmet = {}
var legs = {}

router.get("/:mobName", middleware.isLoggedIn, (req, res, next) => {
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
        console.log('pobieram');
        const data = await pobierzDane();
        console.log('pobrane')
        
        char = data[0]
        waepon = data[1]
        armor = data[2]
        helmet = data[3]
        legs = data[4]
        mob = data[5]
        middleware.whoStart()
        render()
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
    function render() {
    res.render("fight", {char: char,
        waepon: waepon,
        armor: armor,
        helmet: helmet,
        legs: legs,
        mob: mob
        })
    };
});


module.exports = router;