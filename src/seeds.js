const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

const Product = require('./models/Product');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    // await Product.deleteMany({});

    const response = await axios.get('https://fakestoreapi.com/products');
    const products = response.data;

    const formattedProducts = products.map(product => ({
      title: product.title,
      description: product.description,
      price: product.price,
      images: [product.image], 
      category: product.category,
      rating: product.rating.rate, 
    }));

    await Product.insertMany(formattedProducts);
    console.log('Database seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
