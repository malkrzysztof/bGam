const express = require('express');
const bodyParser = require ('body-parser');
const app     = express();
const mysql     = require('mysql');
const session  = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const indexRoutes = require("./routes/index");
const loginRoutes = require("./routes/login");
const signupRoutes = require("./routes/signup");
const logoutRoutes = require("./routes/logout");
const testRoutes = require("./routes/test");
const adventureRoutes = require("./routes/adventure");
const fightRoutes = require("./routes/fight")

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
  secret: 'shh!',
  resave: true,
  cookie: true,
  saveUninitialized: true,
  cookie: { maxAge: 300000 }
}))

app.use(function(req, res, next) {
  res.locals.email = req.session.email;
  next();
});

app.use(function(req, res, next) {
  if (req.url === '/favicon.ico') {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end();
  }
  next();
});

app.use(cookieParser());
// app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

db = mysql.createConnection({
  host     : "sefin.atthost24.pl",
  user     : "6687_bgame",
  password : "Brat!@34",
  database : "6687_bgame",
  multipleStatements: true
});

db.connect(function(err) {
  if (err) {
    throw err
  } else {
  console.log("Connected to DB!")
  };
});

app.use("/", indexRoutes),
app.use("/login", loginRoutes),
app.use("/signup", signupRoutes),
app.use("/logout", logoutRoutes),
app.use("/test", testRoutes),
app.use("/adventure", adventureRoutes),
app.use("/fight", fightRoutes)

app.listen(3000, () => {
    console.log('Server running on port: 3000');
});

function up(){
  setInterval(() => {
    update = "UPDATE `6687_bgame`.`characters` SET `characters`.`char_hp` = `characters`.`char_hp` + 1 WHERE `characters`.`char_hp` < `characters`.`char_hp_max`;" + 
              "UPDATE `6687_bgame`.`characters` SET `characters`.`char_moves` = `characters`.`char_moves` + 1 WHERE `characters`.`char_moves` < 100;"
    db.query(update, function(err){
      if (err){
        throw err
      } else {
        // console.log("Characters HP ++1")
      }
    })
  }, 20000);
}
up()




// ********************* EXP SYSTEM
// ((lvl+1)^1,5)*100

function seedExp(i){
  var exp
  setInterval(() =>{
    for (i; i <= 500; i++){
      exp = ((i + 1)^1.5)*100
      s = "INSERT INTO `6687_bgame`.`lvl` VALUES(" + i + "," + exp + ");"
      db.query(s, function(err){
        if (err) {throw err} else {console.log("Dodałem " + i + "rekord")}
      })
    }
  }, 1000);
}

seedExp(2)

module.exports = app;
