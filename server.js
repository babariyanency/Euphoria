const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
app.use(cors());
app.use(express.json());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("dotenv").config();


const productsRouter = require("./routes/Product");
const brandsRouter = require("./routes/Brand");
const sizeRouter = require("./routes/Size");
const userRouter = require("./routes/User");
const cartRouter = require("./routes/Cart");
const orderRouter = require("./routes/Order");
const wishRouter = require("./routes/Wish");
const reviewRouter = require("./routes/Review")

require("./db/connection");
const products = require("./model/Product");
const { Order } = require("./model/Order");

// app.use(express.static(path.resolve(__dirname, 'build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use("/products", productsRouter.router);
app.use("/brands", brandsRouter.router);
app.use("/size", sizeRouter.router);
app.use("/user", userRouter.router);
app.use("/cart", cartRouter.router);
app.use("/order", orderRouter.router);
app.use("/wishlist", wishRouter.router);
app.use("/review", reviewRouter.router);



// update products
app.get("/products-update/:id", (req, res) => {
  products.findById(req.params.id).then((updatedata) => {
    // console.log(updatedata);
    res.json(updatedata)
  })
})

app.delete("/product-delete/:id", (req, res) => {

  products.findByIdAndDelete(req.params.id).then((updatedata) => {
    res.json(updatedata)
  })
})




//payments 
const stripe = require('stripe')('sk_test_51QecYVQvDxHj3veCyjStWwb76xV4RJlpjjfZnYigf8okJynZmKEUkJ826riAI76NmBepiVRIxIMXgM2iY4dFVyGr000sz1l9as');

app.post('/create-payment-intent', async (req, res) => {
  const { totalAmount, orderId } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount * 100, // for decimal compensation
    currency: 'inr',
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      orderId,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});




app.listen(8000, () => {
  console.log("successfully....");
});
