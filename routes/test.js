const express = require("express");
const router = express.Router();
const moment = require('moment')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = '1234';
const someOtherPlaintextPassword = 'not_bacon';


router.get("/", (req, res) => {
    res.render("test")
})


module.exports = router;