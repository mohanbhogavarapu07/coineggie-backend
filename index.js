import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import subscriberRoutes from './routes/subscriberRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { verifyAdmin } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: [
    'https://krishnakumar.vercel.app',
    'http://localhost:8080',
    'http://localhost:3000',
    'http://localhost:8081'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Request headers:', req.headers);
  next();
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory at:', uploadsDir);
}

// Serve static files from uploads directory
app.use('/api/blog/uploads', express.static(uploadsDir));
console.log('Serving static files from:', uploadsDir);

// Add logging middleware for file requests
app.use('/api/blog/uploads', (req, res, next) => {
  console.log('File request:', {
    method: req.method,
    url: req.url,
    path: path.join(uploadsDir, req.url)
  });
  next();
});

// Routes
app.use('/api/blog', blogRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/assessment', assessmentRoutes);

// 404 handler
app.use((req, res) => {
  console.log('404 Not Found:', req.method, req.url);
  res.status(404).json({ message: 'Not Found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    console.log('Database:', mongoose.connection.name);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at https://kk-backend-wra3.onrender.com`);
}); 