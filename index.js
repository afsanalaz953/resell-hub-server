const dns = require('node:dns');

// // Set custom DNS servers (Google DNS)
 dns.setServers(['8.8.8.8', '8.8.4.4']);


const express = require('express');
const app = express();
const cors = require('cors');
const dontenv = require('dotenv');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
const addproductCollection = db.collection("productCollection");
const myproductCollection = db.collection("myproduct");
const wishlistCollection = db.collection("wishlist");
const paymentCollection = db.collection("payment");
const bookingCollections = db.collection("orderBookingCollections");

// payment api from successpage
app.post('/api/payment', async(req,res) =>{
  const paymentData = req.body
  const result = await paymentCollection.insertOne(paymentData)
  res.json(result)
})

app.post('/api/booking', async(req,res) =>{
  const {price, title, } = req.body;
  console.log(req.body);
  const bookingData= {
    title,
    price,
    buyerEmail, 
    condition,
    bookingDate:new Date(),
  };
  const result = await bookingCollections.insertOne(bookingData)
  res.json(result)
})
// stock update korte hobe

//1)for getting productsdata from form
app.post('/api/seller/products', async(req,res) =>{
  const productsData = req.body
  const result = await addproductCollection .insertOne(productsData)
  res.json(result)
})

// for productdetails page
app.get('/api/seller/products/:id', async (req, res) =>{
const {id} = req.params
const result = await addproductCollection.findOne({_id: new ObjectId(id)})
res.json(result) 
 }); 

// bookingmodal for order
app.post('/booking',  async (req, res) => {
  const bookingOrderData = req.body;
  const result = await bookingCollections .insertOne(bookingOrderData)
  res.json(result)
});
 

// /   //  getting data from mongodatabase for my-tutors page by clicking form
// // userId na dhore data pathano process
 app.get('/api/seller/products', async(req, res) => {
  //  const {userId} = req.params;
  //  console.log(userId,"userId with params")

const result= await addproductCollection.find().toArray()
res.json(result);
console.log( "Allmyproducts in server", result)
 })

 // // productId 
// param thake productId dhore for delete
app.delete("/api/seller/:productId", async(req, res) =>{
const {productId} = req.params;

// // //  if get id then go to mongodoc for delete query
// // // for particular id selection 
//  const query = {_id : new ObjectId(id)}
 const result = await addproductCollection.deleteOne({_id:new ObjectId(productId)});

res.json(result)

});

// updated product api
 app.patch("/api/seller/:productId", async (req, res) => {
const {productId} = req.params
const updatedData = req.body
console.log(updatedData)
const result = await addproductCollection.updateOne(
  {_id: new ObjectId(productId)},
  {$set: updatedData}
)
res.json(result)
 })

//  seller manageorders api
 app.get("/api/seller/orders/:userId", async(req, res)=>{
    // res.send('hello server running')
   const {userId} = req.params;
  const result = await bookingCollections.find({userId}).toArray();
 res.json(result)
})






    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);