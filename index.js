const express = require("express");
const app = express();
const cors = require("cors");
const dal = require("./dal.js");
// const e = require("express");

// used to serve static files from public directory
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

// scrub the user's password from Local storage
// const cleanUser = (user) => {
//   delete user.password;
//   return user;
// };

// create user account
app.get(
  "/account/create/:name/:email/:password/:accountType",
  function (req, res) {
    // check if account exists
    dal.find(req.params.email).then((users) => {
      // if user exists, return error message
      if (users.length > 0) {
        console.log("User already exists");
        res.send("User already exists");
      } else {
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
    });
  }
);

// log in existing user
app.get("/account/login/:email/:password", function (req, res) {
  dal.find(req.params.email).then((user) => {
    // if user exists, check password
    if (user.length > 0) {
      if (user[0].password === req.params.password) {
        res.send(user[0]);
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
app.get(
  "/account/update/:email/:amount/:transactionType",
  async function (req, res) {
    const email = req.params.email;
    const amount = Number(req.params.amount);
    const action = amount > 0 ? "deposit" : "withdraw";
    try {
      const updatedUser = await dal.update(email, amount, action);
      // const updatedUser = await dal.update(email, amount);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating balance:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// check for existing email - async
app.get("/account/checkexisting", async function (req, res) {
  try {
    const exists = await dal.checkForExistingEmail(req);
    res.send(exists);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
