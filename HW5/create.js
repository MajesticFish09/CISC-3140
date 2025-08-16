require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db');
const Recipe = require('./models/recipe');

async function run() {
  await connectDB();

  try {
    // Clear any old copies of this recipe
    await Recipe.deleteMany({ title: 'Classic Tomato Soup' });

    // CREATE
    const created = await Recipe.create({
      title: 'Classic Tomato Soup',
      description: 'A simple and delicious homemade tomato soup.',
      ingredients: ['Tomatoes', 'Onion', 'Garlic', 'Vegetable Broth', 'Olive Oil'],
      instructions: '1. Sauté onions and garlic. 2. Add tomatoes and broth. 3. Simmer and blend.',
      prepTimeInMinutes: 30,
    });

    console.log('✅ Created:', created.toObject());
  } catch (err) {
    console.error('Error during CREATE:', err);
  } finally {
    await mongoose.connection.close();
    console.log('Closed MongoDB connection.');
  }
}

run();
