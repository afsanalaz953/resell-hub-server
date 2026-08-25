// payment api from successpage thake mongopaymentcollection a phathano
// app.post('/api/payment', async(req,res) =>{
//   const paymentData = req.body
//   console.log(paymentData, 'serverPaymentData')
//   const result = await paymentCollection.insertOne(paymentData)
//   res.json(result)
// })




// import { redirect } from 'next/navigation';
// import { stripe } from '../../lib/stripe';

// export default async function Success({ searchParams }) {
//   const { session_id } = await searchParams;

//   if (!session_id) {
//     throw new Error('Please provide a valid session_id (`cs_test_...`)');
//   }

//   // ১. সম্পূর্ণ সেশন ডেটা আনুন
//   const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
//     expand: ['line_items', 'payment_intent']
//   });

//   const { status, metadata, payment_intent, customer_details } = checkoutSession;
//   const customerEmail = customer_details?.email;

//   // ২. ডিবাগ লগ – কম্পোনেন্টের ভিতরে রাখুন
//   console.log('🔍 Session ID:', session_id);
//   console.log('🔍 Session status:', status);
//   console.log('💳 Payment status:', checkoutSession.payment_status);
//   console.log('📦 Metadata:', metadata);

//   // ৩. শর্ত: সেশন সম্পূর্ণ এবং পেমেন্ট সফল
//   if (status !== 'complete' || checkoutSession.payment_status !== 'paid') {
//     console.log('❌ Payment not complete, redirecting home');
//     return redirect('/');
//   }

//   // ৪. পেমেন্ট ডেটা তৈরি করুন (metadata ও payment_intent থেকে)
//   const paymentData = {
//     sessionId: session_id,
//     buyerEmail: metadata?.buyerEmail,
//     buyerId: metadata?.buyerId,
//     productId: metadata?.productId,
//     sellerId: metadata?.sellerId,
//     sellerName: metadata?.sellerName,
//     sellerEmail: metadata?.sellerEmail,
//     title: metadata?.title,
//     totalPrice: Number(metadata?.totalPrice || 0),
//     quantity: Number(metadata?.quantity || 1),
//     paymentIntentId: payment_intent?.id,
//     status: 'paid',
//     createdAt: new Date().toISOString(),
//   };

//   // ৫. পেমেন্ট API-তে ডেটা পাঠান (error handling সহ)
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/payment`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(paymentData),
//     });
//     if (!res.ok) {
//       const errorText = await res.text();
//       console.error('❌ Payment API error:', errorText);
//     } else {
//       const saved = await res.json();
//       console.log('✅ Payment saved:', saved);
//     }
//   } catch (error) {
//     console.error('❌ Fetch error:', error.message);
//   }

//   // ৬. সফল পেজ রেন্ডার
//   return (
//     <section id="success" className="text-center m-10">
//       <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
//       <p className="mt-4">
//         We appreciate your business!
//         <br />
//         A confirmation email will be sent to <strong>{customerEmail}</strong>.
//         <br />
//         If you have any questions, please email{' '}
//         <a href="mailto:orders@example.com" className="text-blue-600 underline">
//           orders@example.com
//         </a>
//       </p>
//       {payment_intent?.id && (
//         <p className="mt-2 text-sm text-gray-500">
//           Transaction ID: {payment_intent.id}
//         </p>
//       )}
//     </section>
//   );
// }

// console.log('🔍 Session ID:', session_id);
// console.log('🔍 Session status:', checkoutSession.status);
// console.log('💳 Payment status:', checkoutSession.payment_status);
// console.log('📦 Metadata:', checkoutSession.metadata);

// import { redirect } from 'next/navigation'

// import { stripe } from '../../lib/stripe'

// export default async function Success({ searchParams }) {
//   const { session_id } = await searchParams

//   if (!session_id)
//     throw new Error('Please provide a valid session_id (`cs_test_...`)')

//   const {
//     status,
//     customer_details: { email: customerEmail }
//   } = await stripe.checkout.sessions.retrieve(session_id, {
//     expand: ['line_items', 'payment_intent']
//   })

//   // if (status === 'open') {
//   //   return redirect('/')
//   // }
// if (status !== 'complete' || checkoutSession.payment_status !== 'paid') {
//   return redirect('/')

// }

//   if (status === 'complete' || status === 'paid') {
//    const paymentData = {
//       sessionId: session_id,
//       buyerEmail: customerEmail,
//       buyerId: metadata.buyerId,
//       productId: metadata.productId,
//       sellerId: metadata.sellerId,
//       sellerName: metadata.sellerName,
//       sellerEmail: metadata.sellerEmail,
//       title: metadata.title,
//       totalPrice: Number(metadata.totalPrice),
//       quantity: Number(metadata.quantity),
//       paymentIntentId: payment_intent?.id,
//       status: 'paid',
//       createdAt: new Date()
//     }

//     // ৩. Payment API–তে ডেটা পাঠান
   
//       const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/payment`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
        
//         body: JSON.stringify(paymentData),
//       })
//     //   if (!res.ok) throw new Error('Failed to save payment')
//     //   const saved = await res.json()
//     //   console.log('✅ Payment saved', saved)
//     // } catch (error) {
//     //   console.error('❌ Error saving payment:', error)
//     // }
//       const resData = await res.json();
//   console.log(resData, "resData") 



//     return (
//       <section id="success">
//         <p>
//           We appreciate your business! A confirmation email will be sent to{' '}
//           {customerEmail}. If you have any questions, please email{' '}
//           <a href="mailto:orders@example.com">orders@example.com</a>.
//         </p>
//       </section>
//     )
//   }
// }




// import { redirect } from 'next/navigation'
// import { stripe } from '@/lib/stripe'

// export default async function Success({ searchParams }) {
//   const { session_id } = await searchParams

//   if (!session_id) {
//     throw new Error('Please provide a valid session_id (`cs_test_...`)')
//   }

//   // ১. সম্পূর্ণ session ডিটেইলস আনুন (metadata ও payment_intent সহ)
//   const session = await stripe.checkout.sessions.retrieve(session_id, {
//     expand: ['line_items', 'payment_intent']
//   })

//   const { status, customer_details, metadata, payment_intent } = session
// console.log(session, "paymentsession")
//   // যদি পেমেন্ট এখনও ওপেন থাকে, হোমে রিডাইরেক্ট করুন
//   if (status === 'open') {
//     return redirect('/')
//   }

//   // শুধু মাত্র status === 'complete' হলে ডেটা সেভ করুন
//   if (status === 'complete') {
//     // ২. Payment ডেটা প্রস্তুত করুন
//     const paymentData = {
//       sessionId: session_id,
//       buyerEmail: customer_details.email,
//       buyerId: metadata.buyerId,
//       productId: metadata.productId,
//       sellerId: metadata.sellerId,
//       sellerName: metadata.sellerName,
//       sellerEmail: metadata.sellerEmail,
//       title: metadata.title,
//       totalPrice: Number(metadata.totalPrice),
//       quantity: Number(metadata.quantity),
//       paymentIntentId: payment_intent?.id,
//       status: 'paid',
//       createdAt: new Date()
//     }

//     // ৩. Payment API–তে ডেটা পাঠান
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/payment`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(paymentData),
//       })
//       if (!res.ok) throw new Error('Failed to save payment')
//       const saved = await res.json()
//       console.log('✅ Payment saved', saved)
//     } catch (error) {
//       console.error('❌ Error saving payment:', error)
//     }

//     // ৪. Booking ডেটা প্রস্তুত করুন (metadata + session থেকে)
//     // const bookingData = {
//     //   sessionId: session_id,
//     //   customerEmail: customer_details.email,
//     //   buyerId: metadata.buyerId,
//     //   sellerId: metadata.sellerId,
//     //   productId: metadata.productId,
//     //   title: metadata.title,
//     //   totalPrice: Number(metadata.totalPrice),
//     //   buyerEmail: metadata.buyerEmail || customer_details.email,
//     //   quantity: Number(metadata.quantity),
//     //   buyerName: metadata.buyername || customer_details.email?.split('@')[0] || 'Guest',
//     //   status: session.status, // 'complete'
//     //   createdAt: new Date().toISOString(),
//     // }

//     // console.log(bookingData, 'bookingData')

//     // // ৫. Booking API–তে ডেটা পাঠান
//     // try {
//     //   const resBook = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings`, {
//     //     method: 'POST',
//     //     headers: { 'Content-Type': 'application/json' },
//     //     body: JSON.stringify(bookingData),
//     //   })
//     //   if (!resBook.ok) {
//     //     const errorText = await resBook.text()
//     //     console.error('Booking API Error:', errorText)
//     //     throw new Error(`Failed to save booking: ${resBook.status}`)
//     //   }
//     //   const savedBooking = await resBook.json()
//     //   console.log('✅ Booking saved', savedBooking)
//     // } catch (error) {
//     //   console.error('❌ Error saving booking:', error)
//     // }

//     // ৬. সাফল্যের পেজ রেন্ডার করুন
//     return (
//       <section id="success">
//         <p>
//           We appreciate your business! A confirmation email will be sent to{' '}
//           {customer_details.email}. If you have any questions, please email{' '}
//           <a href="mailto:orders@example.com">orders@example.com</a>.
//         </p>
//       </section>
//     )
//   }

//   // অন্য কোনো status এলে (যেমন 'expired') হোমে পাঠিয়ে দিন
//   return redirect('/')
// }





// import { redirect } from 'next/navigation'

// import { stripe } from '@/lib/stripe'

// export default async function Success({ searchParams }) {
//   const { session_id } = await searchParams

//   if (!session_id)
//     throw new Error('Please provide a valid session_id (`cs_test_...`)')

//   const {
//     status,
//     customer_details: { email: customerEmail }
//   } = await stripe.checkout.sessions.retrieve(session_id, {
//     expand: ['line_items', 'payment_intent']
//   })

//   if (status === 'open') {
//     return redirect('/')
//   }

//   if (status === 'complete') {
    
//       const paymentData = {
//         sessionId: session_id,
//         buyerEmail: customer_details.email,
//         buyerId: metadata.buyerId,
//         productId: metadata.productId,
//         sellerId: metadata.sellerId,
//         sellerName: metadata.sellerName,
//         sellerEmail: metadata.sellerEmail,
//         title: metadata.title,
//         totalPrice: Number(metadata.totalPrice),
//         quantity: Number(metadata.quantity),
//         paymentIntentId: payment_intent?.id,
//         status: 'paid',
//         createdAt: new Date()
//       }
//   //       await paymentCollection.insertOne(paymentData)
//   //     console.log('Payment saved successfully')
//   //   } catch (error) {
//   //     console.error('Failed to save payment:', error)
//   //     // ডুপ্লিকেট হলে error.code 11000 হবে, আপনি সেটা হ্যান্ডেল করতে পারেন
//   //  }

//  try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/payment`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(paymentData),
//       })
//       if (!res.ok) throw new Error('Failed to save payment')
//       const saved = await res.json()
//       console.log('✅ Payment saved', saved)
//     } catch (error) {
//       console.error('❌ Error saving payment:', error)
//     }


// // // 
// //  ২️⃣ বুকিং ডেটা প্রস্তুত করুন
//     const bookingData = {
//       sessionId: session_id,
//       customerEmail,
//       buyerId: buyerId,              // metadata থেকে buyerId
//       sellerId: sellerId,
//       productId: productId,
//       title: title,
//       totalPrice: Number(totalPrice),
//       buyerEmail,
//       quantity: Number(quantity),
//       buyerName: buyername || customerEmail?.split('@')[0] || 'Guest',
//       status: checkoutSession.status,
//       createdAt: new Date().toISOString(),
//     }

//     console.log(bookingData, "bookingData")

//     // ৩️⃣ বুকিং ডেটা ব্যাকএন্ডে সেভ করুন
//     try {
//       const resBook = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(bookingData),
//       })
//       if (!resBook.ok) {
//         const errorText = await resBook.text()
//         console.error('Booking API Error:', errorText)
//         throw new Error(`Failed to save booking: ${resBook.status}`)
//       }
//       const savedBooking = await resBook.json()
//       console.log('✅ Booking saved', savedBooking)
//     } catch (error) {
//       console.error('❌ Error saving booking:', error)
//     }
 


//     return (
//       <section id="success">
//         <p>
//           We appreciate your business! A confirmation email will be sent to{' '}
//           {customerEmail}. If you have any questions, please email{' '}
//           <a href="mailto:orders@example.com">orders@example.com</a>.
//         </p>
//       </section>
//     )
//   }
// }







// // success page - corrected version

// // import { stripe } from '@/lib/stripe'
// // console.log('🔑 Stripe Secret Key exists?', !!process.env.STRIPE_SECRET_KEY);
// // import { redirect } from 'next/navigation'

// // export default async function Success({ searchParams }) {
// //   const { session_id } = await searchParams
// //   console.log(session_id, "success payment")

// //   if (!session_id) {
// //     throw new Error('Please provide a valid session_id (`cs_test_...`)')
// //   }

// //   const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
// //     expand: ['line_items', 'payment_intent']
// //   })
// //   console.log(checkoutSession, "paymentsession")

// //   const status = checkoutSession.status
// //   const metadata = checkoutSession.metadata
// //   const customerEmail = checkoutSession.customer_details?.email
// //   const transactionId = checkoutSession.payment_intent?.id

// //   // ✅ মেটাডেটা থেকে সকল ডেটা নিন (যা আপনার সেশন ক্রিয়েশনে দেয়া হয়েছে)
// //   const {
// //     totalPrice,
// //     quantity,
// //     buyerId,
// //     buyerEmail,
// //     buyername,
// //     title,
// //     productId,
// //     sellerId,
// //     sellerName,
// //     sellerEmail
// //   } = metadata || {}

// //   // যদি status 'open' হয়, তাহলে হোমে রিডাইরেক্ট
// //   if (status === 'open') {
// //     return redirect('/')
// //   }

// //   // শুধু 'complete' Status এর জন্য কাজ করবে
// //   if (status === 'complete') {
// //     // পেমেন্ট ডেটা প্রস্তুত করুন
// //     const paymentData = {
// //       sessionId: session_id,
// //       paymentStatus: checkoutSession.payment_status,
// //       totalPrice: Number(totalPrice),
// //       quantity: Number(quantity),
// //       transactionId: transactionId,
// //       customerEmail,
// //       buyerId,
// //       buyerEmail,
// //       sellerId,
// //       metadata,
// //       createdAt: new Date().toISOString(),
// //     }

// //     console.log(paymentData, "paymentData")

// //     // 1️⃣ পেমেন্ট ডেটা ব্যাকএন্ডে সেভ করুন
// //     try {
// //       const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/payment`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(paymentData),
// //       })
// //       if (!res.ok) throw new Error('Failed to save payment')
// //       const saved = await res.json()
// //       console.log('✅ Payment saved', saved)
// //     } catch (error) {
// //       console.error('❌ Error saving payment:', error)
// //     }

// //     // ২️⃣ বুকিং ডেটা প্রস্তুত করুন
// //     const bookingData = {
// //       sessionId: session_id,
// //       customerEmail,
// //       buyerId: buyerId,              // metadata থেকে buyerId
// //       sellerId: sellerId,
// //       productId: productId,
// //       title: title,
// //       totalPrice: Number(totalPrice),
// //       buyerEmail,
// //       quantity: Number(quantity),
// //       buyerName: buyername || customerEmail?.split('@')[0] || 'Guest',
// //       status: checkoutSession.status,
// //       createdAt: new Date().toISOString(),
// //     }

// //     console.log(bookingData, "bookingData")

// //     // ৩️⃣ বুকিং ডেটা ব্যাকএন্ডে সেভ করুন
// //     try {
// //       const resBook = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(bookingData),
// //       })
// //       if (!resBook.ok) {
// //         const errorText = await resBook.text()
// //         console.error('Booking API Error:', errorText)
// //         throw new Error(`Failed to save booking: ${resBook.status}`)
// //       }
// //       const savedBooking = await resBook.json()
// //       console.log('✅ Booking saved', savedBooking)
// //     } catch (error) {
// //       console.error('❌ Error saving booking:', error)
// //     }

// //     // ✅ সফল পেজ রিটার্ন করুন
// //     return (
// //       <section id="success" className="text-center m-10">
// //         <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
// //         <p className="mt-4">
// //           We appreciate your business!
// //           <br />
// //           A confirmation email will be sent to <strong>{buyerEmail}</strong>.
// //           <br />
// //           If you have any questions, please email{' '}
// //           <a href="mailto:orders@example.com" className="text-blue-600 underline">
// //             orders@example.com
// //           </a>
// //         </p>
// //         {/* চাইলে ট্রানজেকশন আইডি দেখাতে পারেন */}
// //         <p className="mt-2 text-sm text-gray-500">Transaction ID: {transactionId}</p>
// //       </section>
// //     )
// //   }

// //   // অন্য কোনো status (যেমন 'expired') – হোমে রিডাইরেক্ট
// //   return redirect('/')
// // }








// // // copied from faisal

// // import { subscription } from '@/lib/action/payment'
// // import { stripe } from '@/lib/stripe'
// // import { redirect } from 'next/navigation'
// // import { Button, Card} from "@heroui/react";
// // import Link from "next/link"


// // export default async function Success({ searchParams }) {
// //   const { session_id } = await searchParams
// // console.log(session_id, "success payment")
// //   if (!session_id)
// //     throw new Error('Please provide a valid session_id (`cs_test_...`)')

// //   // const {
// //   //   status,
// //   //   session,
// //   //   metadata,
// //   //   customer_details: { email: customerEmail }
// //   // } = await stripe.checkout.sessions.retrieve(session_id, {
// //   //   expand: ['line_items', 'payment_intent']
// //   // })
// //    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
// //     expand: ['line_items', 'payment_intent']
// //   })
// //   // এবার সেখান থেকে প্রপার্টিগুলো বের করুন
// // const status = checkoutSession.status
// // const metadata = checkoutSession.metadata
// // const customerEmail = checkoutSession.customer_details?.email

// // // 🎯 এটিই আপনার মূল Transaction ID (Payment Intent ID)
// // const transactionId = checkoutSession.payment_intent?.id

// // const dbDate = "2026-07-05T18:41:18.305Z";
// // const onlyDate = dbDate.split('T')[0];
// // const paymentData = {
// //   sessionId: session_id,
// //   paymentStatus: checkoutSession.payment_status, 
// //   // amount: metadata?.amount,                     
// //   quantity: metadata?.quantity,
// //    totalPrice: metadata?.totalPrice,   // ← metadata থেকে totalPrice
// //   transactionId: transactionId, 
// //   sellerId: metadata?.sellerId,              
// //   customerEmail,
// //   metadata,
// //   // createdAt: new Date().toISOString(),
// //    createdAt: onlyDate,
// // };
// // console.log(paymentData, "payment")
// //   if (status === 'open') {
// //     return redirect('/')
// //   }

// //   if (status === 'complete') {

// //     // api call
// //     // amount: session?.metadata?.amount, evetId: session?.metadata?.eventId, eventTitle: session?.metadata?.eventTitle,
// //     //  quantity: session?.metadata?.quantity, email: session?.metadata?.email, paymentType: "booking", 
// //     // transactionId: session?.payment_intent?.id, paymentStatus: session?.payment_status 
// // // const paymentData = {
// // //       sessionId: session_id,
// // //       // status,
// // //       paymentStatus: session?.payment_status,
// // //       amount: session?.metadata?.amount,
// // //       quantity: session?.metadata?.quantity,
// // //       transactionId: session?.payment_intent?.id,
// // //       customerEmail,
// // //       // amountTotal: amount_total,
// // //       // currency,
// // //       metadata,
// // //     //  paymentIntentId: payment_intent?.id,
// // //     // lineItems: line_items?.data || [],
// // //       createdAt: new Date().toISOString(),
// // //     };

// //     try {
// //       // 🌐 Express.js সার্ভারে POST রিকোয়েস্ট পাঠাই
// //       // const API_URL = process.env.EXPRESS_API_URL || 'http://localhost:5000';
// //       const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/payment`, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(paymentData),
// //       });

// //   if (!res.ok) throw new Error('Failed to save payment');
// //     const saved = await res.json();
// //     console.log('✅ Payment saved', saved);
// //   } catch (error) {
// //     console.error('❌ Error saving payment:', error);
// //     // এখানে লগ রাখতে পারেন, কিন্তু UI তে দেখানোর দরকার নেই
// //   }



// // // booking collection a data pathano
// // const bookingData = {
// //   sessionId: session_id,
// //   customerEmail,
// //    buyerId: paymentData.metadata?.userId,      // মেটাডেটা থেকে
// //   sellerId: paymentData.metadata?.sellerId,
// //   // userId:paymentData.metadata?.userId,
// //   productId:paymentData. metadata?.productId,
// //   title: paymentData.metadata?.title,
// //   price: paymentData.metadata?.price,
// //   buyerName: paymentData.name,
// //   status,
// //   createdAt: new Date().toISOString(),
// //   sellerId: paymentData.metadata?.sellerId,
// //   quantity: paymentData.metadata?.quantity,
// //   totalPrice: paymentData.metadata?.totalPrice,
// // };
// // try{
// //       const resdata = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings`, {
// //         method: "POST",
// //          headers: {
// //          "Content-Type": "application/json"
// //         },
// //         body: JSON.stringify(bookingData)
// //     })
// //      const resData = await resdata.json();
// //      console.log(resData,"bookingdata");

// //       if (!res.ok) {
// //         const errorText = await res.text();
// //         console.error('API Error:', errorText);
// //         throw new Error(`Failed to save payment: ${res.status}`);
// //       }

// //       const savedData = await res.json();
// //       console.log('✅ Payment saved to MongoDB:', savedData);
// //     } catch (error) {
// //       console.error('❌ Error sending to API:', error.message);
// //       // এখানে error handle করতে পারেন (যেমন: লগ ফাইল বা অল্টারনেটিভ স্টোরেজ)
// //     }

// // // const res = await ('api/payments',{
// // //   method:"POST",
// // //   headers:{
// // //     "Content Type": "application/json"
// // //   },
// // //   body:JSON.stringify({})
// // // })
// // // const paymentData = await res.json();
// // console.log(paymentData, 'paymentData');

// //     return (
// //       <section id="success">
// //         <p className='text-center m-10'>
// //           We appreciate your business! 
         
// //           <br />
// //           A confirmation email will be sent to{' '}
// //           {buyerEmail}.
// //           <br />
// //            If you have any questions, please email{' '}
// //           <a href="mailto:orders@example.com">orders@example.com</a>.
// //         </p>
  
        
// //       </section>
// //     )
// //   }
  

// //   // অন্য কোনো স্ট্যাটাস (যেমন 'expired') – হোমে রিডাইরেক্ট
// //   return redirect('/')
// // }

// // my code

// import { stripe } from '@/lib/stripe'
// import { redirect } from 'next/navigation'

// export default async function Success({ searchParams }) {
//   const { session_id } = await searchParams
//   console.log(session_id, "success payment")

//   if (!session_id) {
//     throw new Error('Please provide a valid session_id (`cs_test_...`)')
//   }

//   const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
//     expand: ['line_items', 'payment_intent']
//   })

//   const status = checkoutSession.status
//   const metadata = checkoutSession.metadata || {}
//   const customerEmail = checkoutSession.customer_details?.email
//   const transactionId = checkoutSession.payment_intent?.id

//   // মেটাডেটা থেকে সব ফিল্ড ডিস্ট্রাকচার
//   const {
//     totalPrice,
//     quantity,
//     buyerId,
//     buyerEmail,
//     buyername,
//     title,
//     productId,
//     sellerId,
//     sellerName,
//     sellerEmail
//   } = metadata

//   console.log('Status:', status)
//   console.log('Metadata:', metadata)

//   // যদি পেমেন্ট এখনও open থাকে, হোমে রিডাইরেক্ট
//   if (status === 'open') {
//     console.log('Payment is still open, redirecting to home')
//     return redirect('/')
//   }

//   // শুধু complete status-এর জন্য প্রসেস করব
//   if (status === 'complete') {
//     // পেমেন্ট ডেটা প্রস্তুত
//     const paymentData = {
//       sessionId: session_id,
//       paymentStatus: checkoutSession.payment_status,
//       totalPrice: Number(totalPrice),
//       quantity: Number(quantity),
//       transactionId: transactionId,
//       customerEmail,
//       buyerId,
//       buyerEmail,
//       sellerId,
//       metadata,
//       createdAt: new Date().toISOString(),
//     }

//     console.log('Payment Data:', paymentData)

//     // 1. পেমেন্ট ডেটা সেভ করুন
//     try {
//       const resPayment = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/payment`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(paymentData),
//       })
//       if (!resPayment.ok) {
//         const errorText = await resPayment.text()
//         throw new Error(`Payment API error: ${resPayment.status} - ${errorText}`)
//       }
//       const saved = await resPayment.json()
//       console.log('✅ Payment saved:', saved)
//     } catch (error) {
//       console.error('❌ Error saving payment:', error.message)
//     }

//     // 2. বুকিং ডেটা প্রস্তুত করুন
//     const bookingData = {
//       sessionId: session_id,
//       customerEmail,
//       buyerId: buyerId,
//       sellerId: sellerId,
//       productId: productId,
//       title: title,
//       totalPrice: Number(totalPrice),
//       buyerEmail,
//       quantity: Number(quantity),
//       buyerName: buyername || customerEmail?.split('@')[0] || 'Guest',
//       status: checkoutSession.status,
//       createdAt: new Date().toISOString(),
//     }

//     console.log('Booking Data:', bookingData)

//     // 3. বুকিং ডেটা সেভ করুন
//     try {
//       const resBooking = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(bookingData),
//       })
//       if (!resBooking.ok) {
//         const errorText = await resBooking.text()
//         throw new Error(`Booking API error: ${resBooking.status} - ${errorText}`)
//       }
//       const savedBooking = await resBooking.json()
//       console.log('✅ Booking saved:', savedBooking)
//     } catch (error) {
//       console.error('❌ Error saving booking:', error.message)
//     }

//     // ✅ সফল পেজ রিটার্ন করুন (এখানে buyerEmail ব্যবহার করুন, যা ডিক্লেয়ার করা আছে)
//     return (
//       <section id="success" className="text-center m-10">
//         <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
//         <p className="mt-4">
//           We appreciate your business!
//           <br />
//           A confirmation email will be sent to <strong>{buyerEmail || customerEmail}</strong>.
//           <br />
//           If you have any questions, please email{' '}
//           <a href="mailto:orders@example.com" className="text-blue-600 underline">
//             orders@example.com
//           </a>
//         </p>
//         {transactionId && (
//           <p className="mt-2 text-sm text-gray-500">Transaction ID: {transactionId}</p>
//         )}
//       </section>
//     )
//   }

//   // অন্য কোনো status (expired) – হোমে রিডাইরেক্ট
//   console.log('Status is not complete or open, redirecting to home')
//   return redirect('/')
// }