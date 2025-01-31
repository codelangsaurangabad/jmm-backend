const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String }, // Store the file path
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Reference to Category
});

module.exports = mongoose.model('Subcategory', subcategorySchema);