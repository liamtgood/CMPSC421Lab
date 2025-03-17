const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//swagger stuff
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Path to your Swagger JSON file

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/orderSystem');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});





// Middleware to serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));




//customer table
const customerSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  username: String,
  
});

//order table
const orderSchema = new mongoose.Schema({
  cusotmerID: mongoose.Schema.Types.ObjectId,
  products:[String],
  orderDate: { type: Date, default: Date.now },
  status: {type: String, default: 'Pending'},
});
//payment table
const paymentSchema = new mongoose.Schema({
  orderId: mongoose.Schema.Types.ObjectId,
  Cost: Number,

});

//initializes mongoose schema
const Customer = mongoose.model('Customer', customerSchema);
const Order = mongoose.model('Order', orderSchema);
const Payment = mongoose.model('Payment', paymentSchema);

// Routes
const itemsRouter = require('./routes/items');
app.use('/items', itemsRouter);

var customers = [];
var orders = [];

//create customer
app.post('/customers', async(req,res) => {
  const customer = new Customer(req.body);
  const savedCustomer = await customer.save();
  res.status(201).json(savedCustomer);
  
})
//creates order
app.post('/orders', async(req, res) => {
  const order = new Order(req.body);
  const savedOrder = await order.save();
  res.status(201).json(savedOrder);
})
//cancels order
app.put('/orders/:id/cancel', async(req, res) => {
  const order = await Order.findById(req.params.id);
  order.status = 'Cancelled';
  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

//submits payment 
app.post('/payments', async(req, res) => {
  const payment = new Payment(req.body);
  const savedPayment = await payment.save();
  res.status(201).json(savedPayment);
})
//gets the order from id
app.get('/orders/:id', async(req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
})

//deletes order
app.delete('/orders/:id', async (req,res)=>{
  const order = await Order.findByIdAndDelete(req.params.id);
  res.json({message: 'Order deleted'})
})

//updates the products in the order
app.patch('/orders/:id',async(req,res)=>{
  const updateOrder = await Order.finByAndUpdate(
    req.params.id,
    {$set:{products: req.body.products}},
    {new:true}
  );
  res.json(updateOrder);
})


//async operation for proccessing an order
app.post('/orders/:id/process',async (req,res)=>{
  const orderID = req.params.id;
  const order = await Order.findById(orderId);

  res.json({message: 'Processing order'});

  //acynchronus operation process
  setTimeout(async()=>{
    order.status = 'processed';
    await order.save();

  },3000);//delay
  //
})



// Start the server
app.listen(PORT, () => {
  console.log(`Order system is running on port ${PORT}`);
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});