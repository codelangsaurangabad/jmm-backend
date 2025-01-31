// seed.js
const mongoose = require('mongoose');
const Role = require('./models/Role');
require('dotenv').config();

const seedRoles = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB for seeding');

    // Define the roles to seed
    const roles = ['admin', 'regionalManager', 'businessOwner'];

    // Insert or update roles in the database
    for (const role of roles) {
      await Role.findOneAndUpdate(
        { name: role }, // Find a role with this name
        { name: role }, // Update or insert this role
        { upsert: true } // Create the role if it doesn't exist
      );
      console.log(`Role "${role}" seeded`);
    }

    console.log('Roles seeding completed');
  } catch (err) {
    console.error('Error seeding roles:', err);
  } finally {
    // Disconnect from the database
    mongoose.disconnect();
  }
};

// Run the seed function
seedRoles();