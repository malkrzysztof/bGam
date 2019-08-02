const express = require("express");
const router = express.Router();
const moment = require('moment')

router.get("/", (req, res) => {
    var data = moment().format("YYYY-MM-DD HH:MM")    
    res.send("from test route data: " + data)
})

module.exports = router;