var MongoClient = require('mongodb').MongoClient;

async function startt() {
  try {
    const filter = {}; // Modify filter if needed
    const client = await MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");

    const db = client.db('test');
    const coll = db.collection('users');
    
    const count = await coll.countDocuments(filter);
    console.log("Document count:", count);

    if (count === 0) {
      console.log("No documents found in the collection.");
    } else {
      const cursor = coll.find(filter);
      const result = await cursor.toArray();
      console.log("Query result:", result);
    }

    await client.close();
  } catch (err) {
    console.error("An error occurred while connecting to MongoDB or querying the database:", err);
  }
}

startt();
