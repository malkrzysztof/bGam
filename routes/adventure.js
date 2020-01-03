const express = require("express");
const session = require('express-session');
const router = express.Router();
const middleware = require("../middleware");

router.get("/", middleware.isLoggedIn, (req, res, next) => {
  user_id = req.session.user_id
  email = req.session.email

  sql = "SELECT * FROM `6687_bgame`.`characters` WHERE user_id="+ user_id +";" + 
      "SELECT * FROM `6687_bgame`.`waepon` WHERE user_id="+ user_id +";" +
      "SELECT * FROM `6687_bgame`.`armor` WHERE user_id="+ user_id +";" +
      "SELECT * FROM `6687_bgame`.`helmet` WHERE user_id="+ user_id +";" +
      "SELECT * FROM `6687_bgame`.`legs` WHERE user_id="+ user_id +";" +
      "SELECT * FROM `6687_bgame`.`mob`"

  db.query(sql, function (err, char) {
    if (err) {
      throw err;
    } else {
      res.render("adventure", {char: char[0],
                              waepon: char[1], 
                              armor: char[2],
                              helmet: char[3],
                              legs: char[4],
                              mobs: char[5]
      });
    }
  });
});

module.exports = router;