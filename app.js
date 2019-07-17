const express = require('express');
const app     = express();
const mysql     = require('mysql');
const bodyParser = require ('body-parser');
const session  = require('express-session');
const cookieParser = require('cookie-parser');
var morgan = require('morgan');
const indexRoutes = require("./routes");
const loginRoutes = require("./routes/login")



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
  db = mysql.createConnection({
  host     : 'sefin.atthost24.pl',
  user     : '6687_bgame',
  password : 'Brat!@34',
  database : '6687_bgame',
  multipleStatements: true
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

db.query('SELECT * FROM users', function (err, result) {
  if (err) throw err;
  console.log("Result: " + result[0].user_email)
});

app.use("/", indexRoutes);
app.use("login", loginRoutes);

app.listen(3000, () => {
    console.log('Server running on port: 3000');
});

module.exports = app;