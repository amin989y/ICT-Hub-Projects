const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // ✅ Must be before routes
app.use(express.json());

const PORT = 3000;

app.use(express.json());

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'products.json');

let products = [];

function loadProducts() {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    products = JSON.parse(data);
  } catch (err) {
    console.error('Error reading products.json:', err);
    products = [];
  }
}

function saveProducts() {
  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
}
loadProducts();


// GET products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// ✅ POST product (add new)
app.post('/api/products', (req, res) => {
  const newProduct = req.body;

  if (!newProduct.name || !newProduct.price) {
    return res.status(400).json({ error: 'Product must have name and price' });
  }

  // Generate new ID
  newProduct.id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  // Add to array
  products.push(newProduct);

  // 🔥 Save to products.json
  saveProducts();

  // Send success response
  res.status(201).json({ message: 'Product added successfully', product: newProduct });
});
app.delete('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);

  const index = products.findIndex(p => p.id === productId);

  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Remove the product
  products.splice(index, 1);

  // Save updated list to file
  saveProducts();

  res.json({ message: 'Product deleted successfully' });
});



app.listen(PORT, () => {
  console.log(`Server is live at http://localhost:${PORT}`);
});
