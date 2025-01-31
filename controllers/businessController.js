const Business = require('../models/Business');

// Add a new business (Regional Manager only)
const addBusiness = async (req, res) => {
  const { name, description, location, categoryId, subcategoryId, ownerId } = req.body;
  const regionalManagerId = req.user.id; // Regional manager's ID from the token

  try {
    const business = new Business({
      name,
      description,
      location,
      category: categoryId,
      subcategory: subcategoryId,
      owner: ownerId,
      regionalManager: regionalManagerId,
    });
    await business.save();
    res.status(201).json(business);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addBusiness };