const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/userModel');
const Product = require('./models/productModel');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany([
      { name: 'Admin User', email: 'admin@example.com', password: 'password', isAdmin: true },
      { name: 'John Doe', email: 'john@example.com', password: 'password' },
    ]);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = [
      {
        name: 'Airpods Wireless Bluetooth Headphones',
        image: '/images/airpods.jpg',
        description: 'Bluetooth technology lets you connect it with compatible devices wirelessly. High-quality audio offers immersive listening experience. Built-in microphone allows you to take calls while working.',
        brand: 'Apple',
        category: 'Electronics',
        price: 14900,
        countInStock: 10,
        rating: 4.5,
        numReviews: 12,
      },
      {
        name: 'iPhone 13 Pro 256GB Memory',
        image: '/images/phone.jpg',
        description: 'Introducing the iPhone 13 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life.',
        brand: 'Apple',
        category: 'Electronics',
        price: 119900,
        countInStock: 7,
        rating: 4.8,
        numReviews: 24,
      },
      {
        name: 'Sony Playstation 5 Controller',
        image: '/images/playstation.jpg',
        description: 'Experience immersive gaming with the new Sony PS5 controller featuring haptic feedback. Feel physically responsive feedback to your in-game actions.',
        brand: 'Sony',
        category: 'Gaming',
        price: 5990,
        countInStock: 15,
        rating: 4.9,
        numReviews: 36,
      },
      {
        name: 'Logitech G-Series Gaming Mouse',
        image: '/images/mouse.jpg',
        description: 'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience.',
        brand: 'Logitech',
        category: 'Electronics',
        price: 3500,
        countInStock: 25,
        rating: 4.6,
        numReviews: 45,
      },
      {
        name: 'Amazon Echo Dot 3rd Gen',
        image: '/images/alexa.jpg',
        description: 'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
        brand: 'Amazon',
        category: 'Electronics',
        price: 4499,
        countInStock: 12,
        rating: 4.9,
        numReviews: 120,
      },
      {
        name: 'Cannon EOS 80D DSLR Camera',
        image: '/images/camera.jpg',
        description: 'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
        brand: 'Cannon',
        category: 'Electronics',
        price: 74990,
        countInStock: 5,
        rating: 4.7,
        numReviews: 89,
      }
    ].map(p => ({ ...p, user: adminUser }));

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
