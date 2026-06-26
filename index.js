const dns = require('node:dns');

// // Set custom DNS servers (Google DNS)
 dns.setServers(['8.8.8.8', '8.8.4.4']);


const express = require('express');
const app = express();
const cors = require('cors');
const dontenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');
dontenv.config()
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());

// mongodb connection
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/', (req,res) =>{
    res.send('Hello user')
} ) 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

// database collection start of momgo
const db = client.db("resellHub")

const productCollections = db.collection("productCollection")




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);