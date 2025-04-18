const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//swagger stuff
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc'); // Path to your Swagger JSON file

const app = express();
const host = '0.0.0.0'
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
const dbUsername = process.env.MONGO_INITDB_ROOT_USERNAME || 'root';
const dbPassword = process.env.MONGO_INITDB_ROOT_PASSWORD || 'examplepassword';
const dbHost = process.env.MONGO_HOST || 'mongodb';
const dbPort = process.env.MONGO_PORT || '27017';
const dbName = process.env.MONGO_DB_NAME || 'mydatabase';
//mongodb://localhost/mydatabase', {
//password: Ltg220929$$
//const uri = "mongodb+srv://liamgood83:Ltg220929$$@421lab.cvuv0jp.mongodb.net/?retryWrites=true&w=majority&appName=421Lab";
const uri = "mongodb://host.docker.internal:27017/mydatabase";

async function connectToMongoDB() {
  try {
    mongoose.connect("mongodb://mongodb:27017/", {
      dbName: 'mydatabase',
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
      console.log('Connected to MongoDB');
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}


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







// Start the server
app.listen(PORT,host, () => {
  console.log(`Order system is running on port ${PORT}`);
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
  connectToMongoDB();
});

//const Item = mongoose.model('Item',itemSchema);

//module.exports = Item;