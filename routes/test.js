const express = require("express");
const router = express.Router();
const moment = require('moment')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = '1234';
const someOtherPlaintextPassword = 'not_bacon';


router.get("/", (req, res) => {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
            console.log(hash)
            bcrypt.compare(myPlaintextPassword,hash).then(function(res){
                console.log(hash)
            })
        });
    });
})

module.exports = router;