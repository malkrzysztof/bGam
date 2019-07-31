const express = require("express");
const session = require('express-session');
const router = express.Router();
const middleware = require("../middleware");

router.get("/", middleware.isLoggedIn, (req, res, next) => {
  char_id = req.session.char_id

  sql = "SELECT * FROM `6687_bgame`.`characters` WHERE char_id="+ char_id +";" + 
      "SELECT * FROM `6687_bgame`.`waepon` WHERE char_id="+ char_id +";" +
      "SELECT * FROM `6687_bgame`.`armor` WHERE char_id="+ char_id +";" +
      "SELECT * FROM `6687_bgame`.`helmet` WHERE char_id="+ char_id +";" +
      "SELECT * FROM `6687_bgame`.`legs` WHERE char_id="+ char_id +";"

  db.query(sql, function (err, char) {
    if (err) {
      throw err;
    } else {
      JSON.stringify(char)
      //handle empty results from db
      res.render("index", {char: char[0],
                           waepon: char[1], 
                           armor: char[2],
                           helmet: char[3],
                           legs: char[4]
                          });
    } 
  });
});

module.exports = router;