var express = require("express");
var app = express();
var cors = require("cors");
var dal = require("./dal.js");
const e = require("express");

// used to serve static files from public directory
app.use(express.static("public"));
app.use(cors());

// create user account
app.get(
  "/account/create/:name/:email/:password/:accountType",
  function (req, res) {
    // else create user
    dal
      .create(
        req.params.name,
        req.params.email,
        req.params.password,
        req.params.accountType
      )
      .then((user) => {
        console.log(user);
        res.send(user);
      });
  }
);

// login user
const cleanUser = (user) => {
  delete user.password;
  return user;
};

app.get("/account/login/:email/:password", function (req, res) {
  dal.find(req.params.email).then((user) => {
    // if user exists, check password
    if (user.length > 0) {
      if (user[0].password === req.params.password) {
        res.send(cleanUser(user[0]));
      } else {
        res.send("Login failed: wrong password");
      }
    } else {
      res.send("Login failed: user not found");
    }
  });
});

// find user account
app.get("/account/find/:email", function (req, res) {
  dal.find(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// find one user by email - alternative to find
app.get("/account/findOne/:email", function (req, res) {
  dal.findOne(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// update deposit/withdraw amount
app.get("/account/update/:email/:amount", function (req, res) {
  var amount = Number(req.params.amount);
  var action = amount > 0 ? "deposit" : "withdraw";

  dal.update(req.params.email, amount, action).then((response) => {
    console.log(response);
    res.send(response);
  });
});

// all accounts
app.get("/account/all", function (req, res) {
  dal.all().then((docs) => {
    console.log(docs);
    res.send(docs);
  });
});

// check for existing email
app.get("/account/checkexisting", function (req, res) {
  dal.checkForExistingEmail(req).then((exists) => {
    res.send(exists);
  });
});

var port = 3000;
app.listen(port);
console.log("Running on port: " + port);
