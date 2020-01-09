const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const router = express.Router();
const middleware = require("../middleware");

var mob = {}
var char = {}
var waepon = {}
var armor = {}
var helmet = {}
var legs = {}

// router.get("/:mob_name", middleware.isLoggedIn, (req, res) => {
//     var mobName = req.params.mob_name
//     user_id = req.session.user_id
//     email = req.session.email
    
//     sql = "SELECT * FROM `6687_bgame`.`characters` WHERE user_id="+ user_id +";" + 
//         "SELECT * FROM `6687_bgame`.`waepon` WHERE user_id="+ user_id +";" +
//         "SELECT * FROM `6687_bgame`.`armor` WHERE user_id="+ user_id +";" +
//         "SELECT * FROM `6687_bgame`.`helmet` WHERE user_id="+ user_id +";" +
//         "SELECT * FROM `6687_bgame`.`legs` WHERE user_id="+ user_id +";" +
//         "SELECT * FROM `6687_bgame`.`mob` WHERE mob_name='"+ mobName +"';"

//     async function dane(){
//         const data = await db.query(sql, function (err, char) {
//             if (err) {
//                 throw err;
//             } else {
//                 res.render("fight", {char: char[0], // render go outside
//                                     waepon: char[1], 
//                                     armor: char[2],
//                                     helmet: char[3],
//                                     legs: char[4],
//                                     mob: char[5]
//                 });
//             }
//         })
//         return data
//     }
//     dane.then()

// });


router.get("/:mob_name", middleware.isLoggedIn, (req, res) => {
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
    }

    async function dane() {
        console.log('pobieram');
        const data = await pobierzDane();
        console.log('pobrane')
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
    }

    dane();
});
















module.exports = router;
