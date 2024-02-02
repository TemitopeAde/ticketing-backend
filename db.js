const mongoose = require('mongoose');

const uri = 'mongodb+srv://adesiyantope2014:Temade123@cluster0.a6l89lj.mongodb.net/?retryWrites=true&w=majority';

async function connect() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    throw error; // Rethrow the error to propagate it to the calling function
  }
}

async function close() {
  try {
    await mongoose.connection.close();
    console.log('Connection to the database closed');
  } catch (error) {
    console.error('Error closing the database connection:', error.message);
    throw error;
  }
}

module.exports = { connect, close };
