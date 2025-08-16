require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db');
const Recipe = require('./models/recipe');

async function run() {
  await connectDB();

  try {
    // DELETE
    const del = await Recipe.deleteOne({ title: 'Classic Tomato Soup' });

    console.log('✅ Deleted count:', del.deletedCount);
  } catch (err) {
    console.error('Error during DELETE:', err);
  } finally {
    await mongoose.connection.close();
    console.log('Closed MongoDB connection.');
  }
}

run();
