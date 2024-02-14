const { MongoClient } = require("mongodb");

// Connection URI
const uri =
  "mongodb+srv://wwright:123456789wwright@cluster0.yvcwldn.mongodb.net/?retryWrites=true&w=majority";

// Database Name
const dbName = "MERN_bank"; // Update with your database name

// Create a new MongoClient
const client = new MongoClient(uri);

async function main() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log("Connected successfully to MongoDB server");

    // Select the database
    const db = client.db(dbName);
    console.log(`Connected to database: ${dbName}`);

    // List all collections in the database
    const collections = await db.listCollections().toArray();
    console.log("Collections in the database:");
    collections.forEach((collection) => {
      console.log(collection.name);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    // Close the connection when done
    await client.close();
    console.log("Disconnected from MongoDB");
  }
}

// Call the main function to connect to MongoDB and perform operations
main();
