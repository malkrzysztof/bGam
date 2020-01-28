const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const router = express.Router();
const middleware = require("../middleware/middleware");

var char = {}
var waepon = {}
var armor = {}
var helmet = {}
var legs = {}
var baseMob = {}
var mob = {}

router.get("/:mobName", middleware.isLoggedIn, (req, res, next) => {
    var mobName = req.params.mobName
    user_id = req.session.user_id
    email = req.session.email

    let sql = "SELECT * FROM `6687_bgame`.`characters` WHERE user_id="+ user_id +";" + 
    "SELECT * FROM `6687_bgame`.`waepon` WHERE user_id="+ user_id +";" +
    "SELECT * FROM `6687_bgame`.`armor` WHERE user_id="+ user_id +";" +
    "SELECT * FROM `6687_bgame`.`helmet` WHERE user_id="+ user_id +";" +
    "SELECT * FROM `6687_bgame`.`legs` WHERE user_id="+ user_id +";" +
    "SELECT * FROM `6687_bgame`.`mob` WHERE mob_name='"+ mobName +"';"

    main();

    async function main() {
        console.log('pobieram');
        const data = await pobierzDane();
        console.log('pobrane')
        char = data[0]
        waepon = data[1]
        armor = data[2]
        helmet = data[3]
        legs = data[4]
        baseMob = data[5][0]
        middleware.whoStart()
        render()
        generateMob(baseMob)
        fight()
    }

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
        })
    };

    function generateMob(baseMob) {
        // *********** GET BASE STATS FROM DB
            baseMin_hp = parseInt(baseMob.min_hp)
            baseMax_hp = parseInt(baseMob.max_hp)
            baseMin_physical_dmg = parseInt(baseMob.min_physical_dmg)
            baseMax_physical_dmg = parseInt(baseMob.max_physical_dmg)
            baseMin_energy_dmg = parseInt(baseMob.min_energy_dmg)
            baseMax_energy_dmg = parseInt(baseMob.max_energy_dmg)
            baseMin_physical_armor = parseInt(baseMob.min_physical_armor)
            baseMax_physical_armor = parseInt(baseMob.max_physical_armor)
            baseMin_energy_armor = parseInt(baseMob.min_energy_armor)
            baseMax_energy_armor = parseInt(baseMob.max_energy_armor)
        
            // *********** GENERATE NEW MOB STATS
            mob.name = mobName
            mob.hp = Math.floor(Math.random()*(baseMax_hp - baseMin_hp + 1) + baseMin_hp)
            mob.physicalDmg = Math.floor(Math.random()*(baseMax_physical_dmg - baseMin_physical_dmg + 1) + baseMin_physical_dmg)
            mob.energyDmg = Math.floor(Math.random()*(baseMax_energy_dmg - baseMin_energy_dmg + 1) + baseMin_energy_dmg)
            mob.physicalArmor = Math.floor(Math.random()*(baseMax_physical_armor - baseMin_physical_armor + 1) + baseMin_physical_armor)
            mob.energyArmor = Math.floor(Math.random()*(baseMax_energy_armor - baseMin_energy_armor + 1) + baseMin_energy_armor)
    }

    function fight() {
        if (mobStart > charStart) {
            st = mob
            nd = char[0]
        } else {
            st = char[0]
            nd = mob
        }

        char[0].name = char[0].char_name
        char[0].hp = char[0].char_hp
        char[0].physicalDmg = parseInt((char[0].char_str * 0.6) + (waepon[0].physical_dmg * 0.4))
        char[0].physicalArmor = parseInt((char[0].char_str * 0.35) + (char[0].char_dex, 0.35) + multi(helmet, 0.4) + multi(legs, 0.3) + multi(armor, 0.6))
        console.log("char physical DMG: " + char[0].physicalDmg)
        console.log("char physical armor: " + char[0].physicalArmor)
        
        doDmg()

        // *********************************************************FUNCTIONS TO FIGHT
        function multi(a, x){
            if (a[0] == undefined) {
                return value = 0
            } else {
                return parseInt(a[0].physical_armor *= x)
            }
        }
        function doDmg () {
            // console.log("first: " + st.name)
            // console.log("second: " + nd.name)
            // console.log(char[0].hp)
            if (char[0].hp > 0 && mob.hp > 0) {
                console.log("walka")
                var dmg = (st.physicalDmg - nd.physicalArmor)
                // obsługa ujemnego DMG jako chybił.
                nd.hp -= dmg
                console.log(nd.name + " otrzymuje " + dmg + " obrażeń")
            } else {
                if (char[0].hp <= 0) {
                    console.log("u lose")
                } else {
                    console.log("u win")
                }
            }
        }
    }

});



module.exports = router;