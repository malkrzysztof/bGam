const express = require("express");
const router = express.Router();
const moment = require('moment')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = '1234';
const someOtherPlaintextPassword = 'not_bacon';

var mob = {}
var char = {}

router.get("/", (req, res) => {

    
    function generateMob(mobName) {   
    // *********** GET BASE STATS FROM DB
        var sql = 'SELECT * FROM mob WHERE mob_name = ?'
        db.query(sql, [mobName], function(err, results, fields) {
            if (err){
                throw err
            } else {
                baseMin_hp = parseInt(results[0].min_hp),
                baseMax_hp = parseInt(results[0].max_hp),
                baseMin_physical_dmg = parseInt(results[0].min_physical_dmg)
                baseMax_physical_dmg = parseInt(results[0].max_physical_dmg)
                baseMin_energy_dmg = parseInt(results[0].min_energy_dmg)
                baseMax_energy_dmg = parseInt(results[0].max_energy_dmg)
                baseMin_physical_armor = parseInt(results[0].min_physical_armor)
                baseMax_physical_armor = parseInt(results[0].max_physical_armor)
                baseMin_energy_armor = parseInt(results[0].min_energy_armor)
                baseMax_energy_armor = parseInt(results[0].max_energy_armor)
            
                // *********** GENERATE NEW MOB STATS
                
                mob.hp = Math.floor(Math.random()*(baseMax_hp - baseMin_hp + 1) + baseMin_hp)
                mob.physicalDmg = Math.floor(Math.random()*(baseMax_physical_dmg - baseMin_physical_dmg + 1) + baseMin_physical_dmg)
                mob.energyDmg = Math.floor(Math.random()*(baseMax_energy_dmg - baseMin_energy_dmg + 1) + baseMin_energy_dmg)
                mob.physicalArmor = Math.floor(Math.random()*(baseMax_physical_armor - baseMin_physical_armor + 1) + baseMin_physical_armor)
                mob.energyArmor = Math.floor(Math.random()*(baseMax_energy_armor - baseMin_energy_armor + 1) + baseMin_energy_armor)
                console.log(mob)
        
                
                // *********** GENERATE CHAR
                
                char.hp = 10
                char.str = 8
                char.dex = 5
                char.int = 3
                
            }        
        })
    }

    function whoStart() {
        mob.start = Math.floor(Math.random() * (10 - 1 + 1) + 1)
        char.start = Math.floor(Math.random() * (10 - 1 + 1) + 1)
        function retry() {
            if (mob.start == char.start) {
                mob.start = Math.floor(Math.random() * (10 - 1 + 1) + 1)
                char.start = Math.floor(Math.random() * (10 - 1 + 1) + 1)
            }
        }
        retry();
        console.log(mob.start)
        console.log(char.start)
    }
    whoStart()

    function fight(mob, char) {
        console.log('From fight function: ' + mob.hp)
        
    
    }
    
    fight(mob)
        
    generateMob("Dog")

    
    


    res.render("test")
})


module.exports = router;