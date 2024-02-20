const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Sample data (you can replace this with a database)
let products = [];

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Product Management', products });
});

app.post('/add-product', (req, res) => {
  const { name, imageUrl, price } = req.body;
  products.push({ name, imageUrl, price });
  // console.log(products)
  res.redirect('/');
});

app.get('/product/:id', (req, res) => {
  const id = req.params.id;
  const product = products[id];
  res.render('product', { product, id });
});

app.get('/product/:id/edit', (req, res) => {
  const id = req.params.id;
  const product = products[id];
  res.render('edit', { product, id });
});

app.post('/product/:id/edit', (req, res) => {
  const id = req.params.id;
  const { name, imageUrl, price } = req.body;
  products[id] = { name, imageUrl, price };
  res.redirect(`/product/${id}`);
});

app.post('/product/:id/delete', (req, res) => {
  const id = req.params.id;
  products.splice(id, 1);
  res.redirect('/');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
