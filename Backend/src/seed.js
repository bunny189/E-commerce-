import { connectToDatabase } from './db.js';
import { Product } from './models/Product.js';
import { User } from './models/User.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const sampleProducts = [
  {
    title: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 2999,
    images: ['p_img1.png'],
    category: 'Electronics',
    stock: 50,
    rating: 4.5,
    bestseller: true
  },
  {
    title: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitor',
    price: 4999,
    images: ['p_img2.png'],
    category: 'Electronics',
    stock: 30,
    rating: 4.3,
    bestseller: true
  },
  {
    title: 'Designer Sunglasses',
    description: 'Stylish sunglasses with UV protection',
    price: 1999,
    images: ['p_img3.png'],
    category: 'Fashion',
    stock: 100,
    rating: 4.7,
    bestseller: true
  },
  {
    title: 'Premium Coffee Maker',
    description: 'Automatic coffee machine with timer',
    price: 3999,
    images: ['p_img4.png'],
    category: 'Home',
    stock: 25,
    rating: 4.6,
    bestseller: true
  },
  {
    title: 'Wireless Gaming Mouse',
    description: 'High-precision gaming mouse with RGB lighting',
    price: 2499,
    images: ['p_img5.png'],
    category: 'Electronics',
    stock: 40,
    rating: 4.4,
    bestseller: true
  },
  {
    title: 'Organic Cotton T-Shirt',
    description: 'Comfortable organic cotton t-shirt',
    price: 899,
    images: ['p_img6.png'],
    category: 'Fashion',
    stock: 200,
    rating: 4.2,
    bestseller: false
  },
  {
    title: 'Portable Bluetooth Speaker',
    description: 'Waterproof portable speaker with deep bass',
    price: 1799,
    images: ['p_img7.png'],
    category: 'Electronics',
    stock: 60,
    rating: 4.1,
    bestseller: false
  },
  {
    title: 'Stainless Steel Water Bottle',
    description: 'Insulated water bottle keeps drinks cold for 24 hours',
    price: 599,
    images: ['p_img8.png'],
    category: 'Home',
    stock: 150,
    rating: 4.8,
    bestseller: false
  }
];

async function seedDatabase() {
  try {
    await connectToDatabase(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${createdProducts.length} products`);

    // Create admin user if not exists
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      const passwordHash = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        passwordHash,
        role: 'admin'
      });
      console.log('Created admin user: admin@example.com / admin123');
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
