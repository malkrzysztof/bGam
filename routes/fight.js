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

router.get("/:mob_name", middleware.isLoggedIn, (req, res) => {
    var mobName = req.params.mob_name
    user_id = req.session.user_id
    email = req.session.email
    
    sql = "SELECT * FROM `6687_bgame`.`characters` WHERE user_id="+ user_id +";" + 
        "SELECT * FROM `6687_bgame`.`waepon` WHERE user_id="+ user_id +";" +
        "SELECT * FROM `6687_bgame`.`armor` WHERE user_id="+ user_id +";" +
        "SELECT * FROM `6687_bgame`.`helmet` WHERE user_id="+ user_id +";" +
        "SELECT * FROM `6687_bgame`.`legs` WHERE user_id="+ user_id +";" +
        "SELECT * FROM `6687_bgame`.`mob` WHERE mob_name='"+ mobName +"';"

    async function dane(){
        const data = await db.query(sql, function (err, char) {
            if (err) {
                throw err;
            } else {
                res.render("fight", {char: char[0], // render go outside
                                    waepon: char[1], 
                                    armor: char[2],
                                    helmet: char[3],
                                    legs: char[4],
                                    mob: char[5]
                });
            }
        } await return char)
        return data
    }
});

dane.then
















module.exports = router;
































function newFunction() {
    console.log("Char from fight: " + char[0]);
    console.log("mob from fight: " + char[5]);
}
// sql1 = "SELECT * FROM `6687_bgame`.`characters` WHERE user_id="+ user_id +";" + 
// "SELECT * FROM `6687_bgame`.`waepon` WHERE user_id="+ user_id +";" +
// "SELECT * FROM `6687_bgame`.`armor` WHERE user_id="+ user_id +";" +
// "SELECT * FROM `6687_bgame`.`helmet` WHERE user_id="+ user_id +";" +
// "SELECT * FROM `6687_bgame`.`legs` WHERE user_id="+ user_id +";"

// db.query(sql1, function (err, char) {
//     if (err) {
//       throw err;
//     } else {
//         char = char[0],
//         waepon = char[1], 
//         armor = char[2],
//         helmet = char[3],
//         legs = char[4]
//         console.log("from sql1: " + char + waepon)
//     }
// })








// getChar()
// mob(mobName)






// function mob(mobName) {
// // *********** GET BASE STATS FROM DB
// var sql = 'SELECT * FROM mob WHERE mob_name = ?'
// db.query(sql, [mobName], function(err, results, fields) {
//     if (err){
//         throw err
//     } else {
//         baseMin_hp = parseInt(results[0].min_hp)
//         baseMax_hp = parseInt(results[0].max_hp)
//         baseMin_physical_dmg = parseInt(results[0].min_physical_dmg)
//         baseMax_physical_dmg = parseInt(results[0].max_physical_dmg)
//         baseMin_energy_dmg = parseInt(results[0].min_energy_dmg)
//         baseMax_energy_dmg = parseInt(results[0].max_energy_dmg)
//         baseMin_physical_armor = parseInt(results[0].min_physical_armor)
//         baseMax_physical_armor = parseInt(results[0].max_physical_armor)
//         baseMin_energy_armor = parseInt(results[0].min_energy_armor)
//         baseMax_energy_armor = parseInt(results[0].max_energy_armor)

//         // *********** GENERATE NEW MOB STATS
//         mob.name = mobName
//         mob.hp = Math.floor(Math.random()*(baseMax_hp - baseMin_hp + 1) + baseMin_hp)
//         mob.physicalDmg = Math.floor(Math.random()*(baseMax_physical_dmg - baseMin_physical_dmg + 1) + baseMin_physical_dmg)
//         mob.energyDmg = Math.floor(Math.random()*(baseMax_energy_dmg - baseMin_energy_dmg + 1) + baseMin_energy_dmg)
//         mob.physicalArmor = Math.floor(Math.random()*(baseMax_physical_armor - baseMin_physical_armor + 1) + baseMin_physical_armor)
//         mob.energyArmor = Math.floor(Math.random()*(baseMax_energy_armor - baseMin_energy_armor + 1) + baseMin_energy_armor)
//         console.log(mob)
//     }
// })
// }

// async function getChar() {
//             return char = await db.query(sql1, function (err, result){return result},
//             console.log("From async getChar: " + char)
//             )
            
// };





// res.render("fight", {char: char[0],
//                     waepon: char[1], 
//                     armor: char[2],
//                     helmet: char[3],
//                     legs: char[4],
// });