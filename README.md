# 🛍️ Ecommerce Application

A full-stack ecommerce application built with React, Node.js, Express, and MongoDB. Features include user authentication, product management, shopping cart, search functionality, and admin panel.

## ✨ Features

### 🎯 Core Features
- **User Authentication**: Register, login, and JWT-based authentication
- **Product Management**: Browse, search, and filter products by category
- **Shopping Cart**: Add, update, and manage cart items
- **Admin Panel**: Product CRUD operations for administrators
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Search & Filters**: Advanced product search and category filtering

### 🔐 Authentication & Security
- JWT token-based authentication
- Password hashing with bcrypt
- Role-based access control (User/Admin)
- Protected API endpoints

### 🛒 Shopping Features
- Product browsing with images
- Best seller products highlighting
- Shopping cart persistence
- Checkout process with mock payment
- Order history and tracking

### 📱 User Interface
- Modern, responsive design
- Product grid layouts
- Interactive product cards
- Smooth animations and transitions
- Mobile-optimized navigation

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcrypt** - Password hashing
- **Stripe** - Payment processing (configured for development)

### Development Tools
- **Nodemon** - Auto-restart server during development
- **ESLint** - Code linting and formatting

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn** package manager

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd ecommerce-app
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
# Copy .env.example to .env and update values
```

### 3. Environment Configuration
Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_jwt_secret_key_here
CLIENT_ORIGIN=http://localhost:5173
STRIPE_SECRET_KEY=sk_test_your_stripe_key_here
```

### 4. Database Setup
```bash
# Seed the database with sample products
npm run seed
```

This will create:
- 8 sample products with images
- Admin user: `admin@example.com` / `admin123`

### 5. Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create environment file
echo "VITE_API_BASE=http://localhost:5000" > .env.local
```

## 🚀 Running the Application

### Start Backend Server
```bash
cd backend
npm run dev
```
Backend will run on: `http://localhost:5000`

### Start Frontend Server
```bash
cd frontend
npm run dev
```
Frontend will run on: `http://localhost:5173`

## 📱 Application Structure

### Frontend Routes
- `/` - Home page with featured products
- `/collection` - All products with search and filters
- `/product/:id` - Individual product details
- `/cart` - Shopping cart
- `/login` - User authentication
- `/admin` - Admin panel (admin only)
- `/about` - Company information
- `/contact` - Contact form

### Backend API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `GET /api/products` - List products with search/filters
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/update` - Update cart item
- `POST /api/orders/create-payment-intent` - Create payment
- `GET /api/orders` - Get user orders

## 🎨 Customization

### Adding New Products
1. Access admin panel at `/admin`
2. Use the product creation form
3. Or modify `backend/src/seed.js` and re-run seeding

### Styling
- Modify Tailwind classes in components
- Update color scheme in `tailwind.config.js`
- Customize component styles in individual files

### Database Schema
- **User**: name, email, passwordHash, role, cart
- **Product**: title, description, price, images, category, stock, rating, bestseller
- **Order**: user, items, subtotal, total, status, paymentIntentId

## 🔧 Development

### Available Scripts

#### Backend
```bash
npm run dev      # Start development server
npm run start    # Start production server
npm run seed     # Seed database with sample data
```

#### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Code Structure
```
ecommerce-app/
├── backend/                 # Backend server
│   ├── src/
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth middleware
│   │   ├── db.js          # Database connection
│   │   └── server.js      # Main server file
│   ├── .env               # Environment variables
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context providers
│   │   ├── services/      # API service layer
│   │   └── assets/        # Images and static files
│   ├── .env.local         # Frontend environment
│   └── package.json
└── README.md
```

## 🧪 Testing

### Backend Testing
- Test API endpoints using Postman or similar tools
- Verify database connections and operations
- Check authentication and authorization

### Frontend Testing
- Test responsive design on different screen sizes
- Verify user authentication flow
- Test shopping cart functionality
- Check admin panel access

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Build and deploy to your preferred hosting service
3. Ensure MongoDB connection is accessible
4. Set up proper CORS configuration

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Update `VITE_API_BASE` to point to your production backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the console for error messages
2. Verify environment variables are set correctly
3. Ensure MongoDB is running and accessible
4. Check that both frontend and backend servers are running

## 🔮 Future Enhancements

- [ ] Real payment integration with Stripe
- [ ] User profile management
- [ ] Product reviews and ratings
- [ ] Email notifications
- [ ] Advanced search filters
- [ ] Wishlist functionality
- [ ] Multi-language support
- [ ] PWA capabilities

---

**Happy Shopping! 🛍️✨**
