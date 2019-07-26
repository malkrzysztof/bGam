const express = require("express");
const router = express.Router();

var char_id = 1

sql = "SELECT * FROM `6687_bgame`.`characters` WHERE char_id="+ char_id +";" + 
      "SELECT * FROM `6687_bgame`.`waepon` WHERE char_id="+ char_id +";" +
      "SELECT * FROM `6687_bgame`.`armor` WHERE char_id="+ char_id +";" +
      "SELECT * FROM `6687_bgame`.`helmet` WHERE char_id="+ char_id +";" +
      "SELECT * FROM `6687_bgame`.`legs` WHERE char_id="+ char_id +";"

router.get("/", (req, res, next) => {
  db.query(sql, function (err, char) {
    if (err) {
      throw err;
    } else {
      JSON.stringify(char)
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