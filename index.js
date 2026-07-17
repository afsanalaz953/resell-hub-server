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
const SellerOrderCollections = db.collection("orders");
const wishlistCollection = db.collection("wishlist");
const paymentCollection = db.collection("payment");
const bookingCollections = db.collection("orderBookingCollections");

// Buyer myOrder page api. 1ta 1ta kore data phathano mongo thake
 app.get("/api/buyer/myorders/:userId", async(req, res)=>{
    // res.send('hello server running')
   const {userId} = req.params;
  const result = await bookingCollections.find({userId}).toArray();
 res.json(result)
})

// payment api from successpage thake mongopaymentcollection a phathano
app.post('/api/payment', async(req,res) =>{
  const paymentData = req.body
  const result = await paymentCollection.insertOne(paymentData)
  res.json(result)
})

// payment page a data pahathano 1ta 1ta kore
app.get("/api/buyer/payment", async (req, res) => {
  try {
    const { customerEmail} = req.query;  // ✅ query থেকে নিন

    if (!customerEmail) {
      return res.status(400).json({ error: "customerEmail is required" });
    }

    // customerEmail দিয়ে payment collection-এ খুঁজুন (সরাসরি ফিল্ড)
    const result = await paymentCollection.find({ customerEmail }).toArray();
      res.json(result);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}); 

// 5. Atomically decrease availableStock by 1
// stock kome jasse start
//  app.patch("/api/products/:id", async (req, res) => {
// const {id} = req.params
// const updatedData = req.body
// console.log(updatedData)
// const result = await addproductCollection.updateOne(
//   {_id: new ObjectId(id)},
//   { $inc: { stock: -1 } }
// )
// res.json(result)
//  })
// stock kome jasse end
  // await addproductCollection.updateOne(
  // //  { _id: new ObjectId(id)},
  // {title},
  //    { $inc: { stock: -1 } }
  // //     [
  // //   { $set: { availableSlots: { $toInt: "$availableSlots" } } },  // string → number
  // //   { $set: { availableSlots: { $subtract: ["$availableSlots", 1] } } } // ১ কমানো
  // // ]
  //  );

app.post('/api/bookings', async(req,res) =>{
 const {price, title,userId, status,condition,_id} = req.body;
//  const { sessionId, status, customerEmail, metadata, createdAt } = req.body;
const bookingData = req.body;
  console.log(req.body);
  
  const result = await bookingCollections.insertOne(bookingData)
  res.json(result)
})
// stock update korte hobe
// buyerOreder page delete
   //   // for update bookingdelete 
 app.patch("/booking/:bookingId", async(req, res) =>{
const {bookingId} = req.params;
//  console.log("placeId", id);
// //  if get id then go to mongodoc for delete query
// // for particular id selection 
// const query = {_id : new ObjectId(id)}
const result = await bookingCollections.updateOne(
  {_id:new ObjectId(bookingId)},
{ $set: { status: "cancelled"}}
)
// console.log(result);
res.json(result)

 });






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

// buyingmodal for Seller order
app.post('/api/orders',  async (req, res) => {
  const buyingOrderData = req.body;
  console.log(buyingOrderData, "serverOrder")
  const result = await SellerOrderCollections.insertOne(buyingOrderData)
  res.json(result)
});
// //  seller manageorders api
 app.get("/api/orders", async(req, res)=>{
    
   const { sellerId} = req.query;
 const result = await SellerOrderCollections.find({ sellerId}).toArray();
 res.json(result)
})
 

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
//  Admin products update for pending and approved
app.patch("/api/products/:adminproductid", async (req, res) => {
const {adminproductid} = req.params;
const updatedAdminProductData = req.body
console.log(updatedAdminProductData, "adminupdatedproduct")

 const filter = {_id: new ObjectId(adminproductid)};
 const updatedAdminStatus = {
 $set: {
  status: updatedAdminProductData.status
  }
}
const result = await addproductCollection.updateOne(filter,updatedAdminStatus) 
res.json(result);
 })

//  admin rejected power
app.delete("/api/admin/:rejectedproductid", async(req, res) =>{
const {rejectedproductid} = req.params;

// // //  if get id then go to mongodoc for delete query
// // // for particular id selection 
//  const query = {_id : new ObjectId(rejectedproductid)}
 const result = await addproductCollection.deleteOne({_id:new ObjectId(rejectedproductid)});

res.json(result)
 })

// //  seller manageorders api
//  app.get("/api/seller/orders/:userId", async(req, res)=>{
//     // res.send('hello server running')
//    const {userId} = req.params;
//   const result = await bookingCollections.find({userId}).toArray();
//  res.json(result)
// })






    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);