const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Create a product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    let image = (req.file && req.file.path) || '';
    image = '/' + image.replace(/\\/g, '/').split('/').filter(e => e && e != 'public').join('/');

    const product = new Product({
      ...req.body,
      image,
    });
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
});

// Update a product by id
router.patch('/:id', upload.single('image'), async (req, res) => {
  try {
    let updates = req.body;
    if (req.file) {
      let image = (req.file && req.file.path) || '';
      image = '/' + image.replace(/\\/g, '/').split('/').filter(e => e && e != 'public').join('/');
      updates.image = image;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a product by id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a product by id
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
