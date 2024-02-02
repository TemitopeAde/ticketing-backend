const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const mongoUri = 'mongodb+srv://hellenmara1212:Temade123@cluster0.v03ddg2.mongodb.net/items';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

const productSchema = new mongoose.Schema({
  // Define your schema here
  // Example:
  title: String,
  description: String,
  // Add other fields as needed
}, { collection: "items" });

const Product = mongoose.model('Product', productSchema);

app.get('/api/items', async (req, res) => {
  console.log(req.query);
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const searchQuery = req.query.search || '';

    const regex = new RegExp(searchQuery, 'i');

    const count = await Product.countDocuments({
      $or: [
        { NAME: regex },
        { VENUE: regex },
        { CITY: regex },
        { CATEGORY: regex },
        { TYPE: regex }
        // Add more fields if needed
      ]
    });

    const totalPages = Math.ceil(count / limit);

    const items = await Product.find({
      $or: [
        { NAME: regex },
        { VENUE: regex },
        { CITY: regex },
        { CATEGORY: regex },
        { TYPE: regex }
        // Add more fields if needed
      ]
    })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    if (!items || items.length === 0) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({
      items,
      pagination: { current: page, totalPages, totalItems: count }
    });

    console.log(items.length);
  } catch (error) {
    console.error('Error fetching items:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
