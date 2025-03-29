const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//swagger stuff
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc'); // Path to your Swagger JSON file

const app = express();
const host = '0.0.0.0'
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

//swagger connection
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'My API',
        version: '1.0.0',
        description: 'API documentation using Swagger',
      },
      servers: [
        {
          url: `http://localhost:${PORT}`,
        },
      ],
    components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
   },
     },
      apis: ['./routes/*.js'], // Path to your API docs
    };
  const swaggerDocs = swaggerJSDoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



// Middleware to serve Swagger UI
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc));



/*
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
  status: {type: String, default: 'Pending'},
});
//payment table
const paymentSchema = new mongoose.Schema({
  orderId: mongoose.Schema.Types.ObjectId,
  Cost: Number,

});*/

/*const itemSchema = new mongoose.Schema({
    products:[String],
    status: {type: String, default: 'Pending'},
  });*/

//initializes mongoose schema

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the API');
  });
  
const itemsRouter = require('./routes/items');
app.use('/items', itemsRouter);

const userRoutes = require('./routes/items');
app.use('/api', userRoutes);

var customers = [];
var orders = [];

/*
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
})*/

/*
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
})*/



// Start the server
app.listen(PORT,host, () => {
  console.log(`Order system is running on port ${PORT}`);
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});

//const Item = mongoose.model('Item',itemSchema);

//module.exports = Item;