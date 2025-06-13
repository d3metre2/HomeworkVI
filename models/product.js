const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
    location: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
});

const specSchema = new mongoose.Schema({}, { strict: false });

const productSchema = new mongoose.Schema({
    category:     { type: String, required: true },
    title:        { type: String, required: true, index: true },
    price:        { type: Number, required: true, min: 0 },
    warehouses:   { type: [warehouseSchema], default: [] },
    specifications: { type: specSchema, default: {} },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
