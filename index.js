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
const userCollection = db.collection("user");



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

  // for buyer
// bookingCollection a data dukha from buyingModal-stripe-success
app.post('/api/bookings', async(req,res) =>{
 const {price, title,userId, status,condition,_id, buyerName, buyerPhone, sellerName, sellerId, productId} = req.body;
//  const { sessionId, status, customerEmail, metadata, createdAt } = req.body;
const bookingData = req.body;
  console.log(req.body);
  
  const result = await bookingCollections.insertOne(bookingData)
  res.json(result)
})
// Buyer myOrder page api. 1ta 1ta kore data phathano mongo thake
 app.get("/api/buyer/myorders/:email", async(req, res)=>{
    // res.send('hello server running')
   const {email} = req.params;
   console.log('buyerordersIdemail', email)
const result = await bookingCollections.find({customerEmail: email}).toArray();
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

//For pagination rules
//  1)TotalPage=Math.ceil(totaldata/limit)=increment+1
// or TotalPage=Math.flore(totaldata/limit)=decrement-1
// 2)skip= (pageno.-1)*limit(10)=ans

//1)for getting productsdata from form
app.post('/api/seller/products', async(req,res) =>{
  const productsData = req.body
  const result = await addproductCollection.insertOne(productsData)
  res.json(result)
})

// // সব প্রোডাক্টের জন্য in  product page
// app.get('/api/seller/products', async (req, res) => {
//   const result = await addproductCollection.find({status: "Approved"}).toArray();
//   res.json(result);
// });

// app.get('/api/seller/products', async (req, res) =>{
// const {title} = req.query;
// const result = await addproductCollection.find({title}).toArray();
// res.json(result) 
//  }); 
//  pagination start for productpage
app.get('/api/seller/products', async (req, res) =>{
  const limit = Number(req.query.limit)|| 8;
  const page = Number(req.query.page)|| 1;

  total_data = await addproductCollection.countDocuments()
total_page = Math.ceil(total_data/limit)

const skip = (page-1) *limit

const data = await addproductCollection.find({status: "Approved"}).skip(skip).limit(limit).toArray();
res.json({total_page,page,skip, data}) 
 });

///////
// For admin all products 
app.get('/api/admin/products/all', async (req, res) => {
  const result = await addproductCollection.find({}).toArray();
  res.json(result);
});
app.get('/api/admin/products', async (req, res) =>{
const {title} = req.query;
const result = await addproductCollection.find({title}).toArray();
res.json(result) 
 }); 

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
  res.json(result);
  console.log( "Allordersproducts in server", result)
});
// //  seller manageorders api
 app.get("/api/orders", async(req, res)=>{
    
   const {sellerId} = req.query;
 const result = await SellerOrderCollections.find({sellerId}).toArray();
 res.json(result)
})
// sellermanageorder updates for Action and Status--- 
// ✅ PATCH route to update order status
 app.patch("/api/orders/:orderId", async (req, res) => {
const {orderId} = req.params
const orderUpdatedData = req.body
console.log(orderUpdatedData, "orderActionButton")
const filter = {_id: new ObjectId(orderId)};
 const updatedOrderStatus = {
 $set: {
  status: orderUpdatedData.status
  }
}

const result = await SellerOrderCollections.updateOne(filter,updatedOrderStatus)
  

res.json(result)
 })
//  Admin products update for pending and approved
// app.patch("/api/products/:adminproductid", async (req, res) => {
// const {adminproductid} = req.params;
// const updatedAdminProductData = req.body
// console.log(updatedAdminProductData, "adminupdatedproduct")

//  const filter = {_id: new ObjectId(adminproductid)};
//  const updatedAdminStatus = {
//  $set: {
//   status: updatedAdminProductData.status
//   }
// }
// const result = await addproductCollection.updateOne(filter,updatedAdminStatus) 
// res.json(result);
//  })

//  seller order rejected power
app.delete("/api/orders/:rejectedorderid", async(req, res) =>{
const {rejectedorderid} = req.params;

// // //  if get id then go to mongodoc for delete query
// // // for particular id selection 
//  const query = {_id : new ObjectId()}
 const result = await SellerOrderCollections.deleteOne({_id:new ObjectId(rejectedorderid)});

res.json(result)
 })



// selelrorder update end
// sellerorder status update start

// GET all orders (with optional status filter)
app.get('/api/orders', async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH update order status
app.patch('/api/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // শুধুমাত্র অনুমোদিত স্ট্যাটাসগুলো গ্রহণ করি
    if (!['pending', 'canceled', 'delivered'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true } // আপডেট হওয়া ডকুমেন্টটি রিটার্ন করবে
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



// ststaus update end

// my id
// app.get('/api/seller/productlist', async(req, res) => {
//   const {sellerId} = req.query;
//  console.log("sellerId for sellermyproduct", sellerId);

// const result= await addproductCollection.find({sellerId : sellerId}).toArray()
// // const myProducts = await addproductCollection .filter(
// //     (product) => product.sellerId === sellerId
// //   );
// res.json(result);
// console.log( "Allmyproducts in server", result)

//  })
// my id 

// for product search of seller
//  
// app.get('/api/seller/products', async (req, res) => {
//   console.log("🔍 Full query params:", req.query);
//   try {
//     const { search} = req.query;
//     let query = {};   // ← বেস কোয়েরি অবজেক্ট

//     // নাম অনুযায়ী সার্চ
//     if (search) {
//       query.title = { $regex: search, $options: 'i' };
//      console.log("📝 Search query:", query);
//   }
//    // কোয়েরি এক্সিকিউট
//     const result = await addproductCollection.find(query).toArray();
//     console.log("✅ Found:", result.length, "selelrProductssearch");
//    res.json(result);   // সব সময় JSON রিটার্ন করবে
//   } catch (error) {
//    console.error('Error in /tutors:', error);
//      res.status(500).json({ error: 'Internal server error' });
//    }
// });
// code for seaech new---
// GET /api/seller/productlist
app.get('/api/seller/productlist', async (req, res) => {
  try {
    const { sellerId, search } = req.query;

    // ✅ ফিক্স ৫: sellerId বাধ্যতামূলক
    if (!sellerId) {
      return res.status(400).json({ error: 'sellerId required' });
    }

    const filter = { sellerId: sellerId };

    // ✅ ফিক্স ৬: search থাকলে regex দিয়ে title ফিল্টার (স্পেশাল ক্যারেক্টার escape)
    if (search) {
      const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.title = { $regex: safeSearch, $options: 'i' };
    }

    const products = await addproductCollection.find(filter).toArray();
    res.json(products);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

////



//  try {
//     const { userId } = req.params;
//     console.log("Searching for sellerId:", userId); // কনসোলে চেক করুন
//     const products = await Product.find({ sellerId: userId }); // ফিল্ডের নাম sellerId
//     console.log("Found products:", products); // কয়টি পেলেন দেখুন
//     res.status(200).json(products); // সবসময় অ্যারে পাঠান
//   } catch (error) {
//     res.status(500).json([]); // error হলেও খালি অ্যারে পাঠান
//   }
// });




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
//  const query = {_id : new ObjectId()}
 const result = await addproductCollection.deleteOne({_id:new ObjectId(rejectedproductid)});

res.json(result)
 })


// //  admin manageUser page api, query thak enite hobe whole user, akta user 
// means userId nile hobe na. $ne=not equal
 app.get("/api/admin/user", async(req, res)=>{
    // res.send('hello server running')
  //  const {userId} = req.query;
  const result = await userCollection.find({ role: { $ne: 'admin'}}).toArray();
 res.json(result)
})
// true বা false পাঠাবে ফ্রন্টএন্ড থেকে
// admin user block power
app.patch("/api/admin/user/block/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { isBlocked } = req.body; 

    // MongoDB-তে আপডেট করো
    const result = await userCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { isBlocked: isBlocked } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// //  Admin manageorders api
 app.get("/api/admin/allorders", async(req, res)=>{
  
 const result = await SellerOrderCollections.find()
//  .sort({ createdAt: -1 })       // নতুন অর্ডার আগে দেখাবে   
 .toArray();
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