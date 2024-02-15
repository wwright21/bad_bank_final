const MongoClient = require("mongodb").MongoClient;
require("dotenv").config({ path: "./config.env" });

const uri = process.env.MONGODB_URI;
let db;

(async () => {
  try {
    const client = await MongoClient.connect(uri);
    console.log("Connected to MongoDB!");
    db = client.db("MERN_bank");
  } catch (error) {
    console.error("Eerror connecting to Mongo:", error);
    process.exit(1);
  }
})();

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

// create account - async
async function create(name, email, password, accountType) {
  try {
    const accountNumber = generateAccountNumber();
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
    await collection.insertOne(doc, { w: 1 });
    console.log("user created successfully");
    return doc;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

// find user account - async
async function find(email) {
  try {
    const customers = await db
      .collection("users")
      .find({ email: email })
      .toArray();
    return customers;
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
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

// update via deposit/withdraw and with transaction type - async
async function update(email, amount, transactionType) {
  try {
    const currentDate = new Date();
    const estDateString = currentDate.toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    const transaction = {
      amount: amount,
      timestamp: estDateString,
      transactionType,
    };

    const updateDoc = await db.collection("users").findOneAndUpdate(
      { email: email },
      {
        $inc: { balance: amount },
        $push: { transactionHistory: transaction },
      },
      { returnOriginal: false }
    );
    console.log(updateDoc);
    return updateDoc;
  } catch (error) {
    throw error;
  }
}

// fetch only email addresses - async
async function checkForExistingEmail(req) {
  const query = req.query || {};
  try {
    const docs = await db.collection("users").find(query).toArray();
    return { existing: docs.length > 0 };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  create,
  find,
  findOne,
  update,
  checkForExistingEmail,
};
