const express = require('express');
const bodyParser = require ('body-parser');
const app     = express();
const mysql     = require('mysql');
const session  = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const indexRoutes = require("./routes/index");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");

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

app.use(session({
  secret: 'alw@ysSecret23%$Shhh!',
  resave: true,
  cookie: true,
  saveUninitialized: true,
  cookie: { maxAge: 20000 }
}))

app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

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

app.use("/", indexRoutes),
app.use("/login", loginRoutes),
app.use("/logout", logoutRoutes)

app.listen(3000, () => {
    console.log('Server running on port: 3000');
});

module.exports = app;