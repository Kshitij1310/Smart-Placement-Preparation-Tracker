import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from './middleware/cors.js';
import errorHandler from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Import routes
import tasksRoutes from './routes/tasks.js';
import applicationsRoutes from './routes/applications.js';
import interviewsRoutes from './routes/interviews.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);



// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/tasks', tasksRoutes);
app.use('/api/applications', applicationsRoutes);
app.use('/api/interviews', interviewsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API Base URL: http://localhost:${PORT}/api`);
});

export default app;
