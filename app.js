const express = require('express');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://hellenmara1212:Temade123@cluster0.v03ddg2.mongodb.net/square', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

// Define a Mongoose schema
const itemSchema = new mongoose.Schema({
  name: String,
  description: String
}, { collection: "square" });

// Define a Mongoose model
const Item = mongoose.model('Item', itemSchema);

// Define a route to fetch items
app.get('/items', async (req, res) => {
  try {
    // Fetch items from the database
    const items = await Item.find();
    res.json(items); // Send items as JSON response
  } catch (err) {
    console.error('Error fetching items', err);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
