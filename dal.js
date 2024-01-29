const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
let db = null;

// connect to mongo
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
  console.log("Connected successfully to db server");

  // connect to myproject database
  db = client.db("myproject");
});

// create user account number
function generateAccountNumber() {
  // Generate two random letters
  const letters = Array.from({ length: 2 }, () =>
    String.fromCharCode(Math.random() * 26 + 97)
  ).join("");

  // Generate eight random digits
  const digits = Array.from({ length: 8 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");

  // Combine letters, hyphen, and digits
  const accountNumber = `${letters}-${digits}`;

  return accountNumber;
}

// create account
function create(name, email, password, accountType) {
  const accountNumber = generateAccountNumber();
  return new Promise((resolve, reject) => {
    const collection = db.collection("users");
    const doc = {
      name,
      email,
      password,
      balance: 0,
      accountNumber,
      transactionHistory: [],
      accountType,
    };
    collection.insertOne(doc, { w: 1 }, function (err, result) {
      err ? reject(err) : resolve(doc);
    });
  });
}

// find user account
function find(email) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .find({ email: email })
      .toArray(function (err, docs) {
        err ? reject(err) : resolve(docs);
      });
  });
}

// find user account
function findOne(email) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .findOne({ email: email })
      .then((doc) => resolve(doc))
      .catch((err) => reject(err));
  });
}

// update - deposit/withdraw amount
function update(email, amount) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .findOneAndUpdate(
        { email: email },
        { $inc: { balance: amount } },
        { returnOriginal: false },
        function (err, documents) {
          err ? reject(err) : resolve(documents);
        }
      );
  });
}

// all users
function all() {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .find({})
      .toArray(function (err, docs) {
        err ? reject(err) : resolve(docs);
      });
  });
}

// fetch only email addresses
function checkForExistingEmail(req) {
  const query = req.query || {};
  return new Promise((resolve, reject) => {
    const res = db
      .collection("users")
      .find(query)
      .toArray((err, docs) => {
        err ? reject(err) : resolve({ existing: docs[0] ? true : false });
      });
  });
}

module.exports = { create, find, findOne, update, all, checkForExistingEmail };
