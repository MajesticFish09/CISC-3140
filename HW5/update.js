require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db');
const Recipe = require('./models/recipe');

async function run() {
  await connectDB();

  try {
    // UPDATE
    const updated = await Recipe.findOneAndUpdate(
      { title: 'Classic Tomato Soup' },
      { description: 'UPDATED: silky, comforting tomato soup — great with grilled cheese.' },
      { new: true }
    );

    if (updated) {
      console.log('✅ Updated:', updated.toObject());
    } else {
      console.log('⚠️ No recipe found to update.');
    }
  } catch (err) {
    console.error('Error during UPDATE:', err);
  } finally {
    await mongoose.connection.close();
    console.log('Closed MongoDB connection.');
  }
}

run();
