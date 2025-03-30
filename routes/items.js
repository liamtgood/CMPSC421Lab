const express = require('express');
const router = express.Router();
const Item = require('../models/item');

/**
* @swagger
* components:
*  schemas:
*   items:
*    type: object
*    properties:
*     products:
*      type: [string]
*      description: The user's name
*     status:
*      type: {type: String, default: 'Pending'}
*      description: status of order
*/
/**
* @swagger
* /items:
*  post:
*   summary: Create a new order
*   requestBody:
*    required: true
*    content:
*     application/json:
*      schema:
*       $ref: '#/components/schemas/items'
*   responses:
*    201:
*     description: order created
*/
// Create a new order
router.post('/', async(req, res) => {
  try {
    const newItem = await Item.create(req.body);
  res.status(201).json(newItem);  
  
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



/**
* @swagger
* /items:
*  get:
*   summary: Retrieve a list of orders
*   responses:
*    200:
*     description: A list of orders
*/


// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



/**
* @swagger
* /items:
*  patch:
*   summary: Update order
*   responses:
*    200:
*     description: Update order
*/


// Update an item
router.patch('/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new:true });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
* @swagger
* /items:
*  delete:
*   summary: Delete an order
*   responses:
*    200:
*     description: Delete an order
*/
// Delete an item
router.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



/**
* @swagger
* /items:
*  put:
*   summary: cancel a order
*   responses:
*    200:
*     description: cancel a order
*/
//cancels order
router.put('/:id/cancel', async(req, res) => {
  try{
    const order = await Item.findById(req.params.id);
    order.status = 'Cancelled';
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;