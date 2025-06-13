const express = require('express');
const router = express.Router();
const Product = require('../../models/product');

// Get all products
router.get('/all', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create new product
router.post('/', async (req, res) => {
    try {
        const product = new Product(req.body);
        const result = await product.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update product specifications
router.patch('/:id/specifications', async (req, res) => {
    try {
        const { specifications } = req.body;
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { specifications },
            { new: true }
        );
        if (!product) return res.status(404).json({ message: 'Not found' });
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Search and pagination by title
router.get('/', async (req, res) => {
    try {
        const { title = '', page = 1, limit = 10 } = req.query;
        const query = title ? { title: new RegExp(title, 'i') } : {};

        const products = await Product.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Product.countDocuments(query);

        res.json({ items: products, total, page: Number(page), limit: Number(limit) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
