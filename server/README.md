# Smart Placement Preparation Tracker - Backend Server

## Overview
Express.js REST API backend for the Smart Placement Preparation Tracker application. Handles all CRUD operations for tasks, applications, and interview schedules with MongoDB persistence.

## Tech Stack
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18.2
- **Database**: MongoDB (local or MongoDB Atlas)
- **ODM**: Mongoose 7.5.0
- **Middleware**: CORS, Error Handler
- **Development**: Nodemon for auto-reload

## Installation

### Prerequisites
- Node.js 18+ installed
- MongoDB running (locally or MongoDB Atlas connection string)
- npm or yarn package manager

### Setup Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create `.env` file** (if not already created)
   ```bash
   cp .env.example .env
   ```

3. **Configure environment variables** in `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/placement-tracker
   PORT=5000
   CLIENT_URL=http://localhost:5175
   NODE_ENV=development
   ```

### MongoDB Setup Options

#### Option A: Local MongoDB
```bash
# Start MongoDB (Windows)
mongod

# Or if using Homebrew on Mac
brew services start mongodb-community
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string: `mongodb+srv://<username>:<password>@cluster.mongodb.net/placement-tracker`
4. Update `MONGODB_URI` in `.env`

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```
Server will start on `http://localhost:5000`

### Production Mode
```bash
npm start
```

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Tasks Endpoints
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Applications Endpoints
- `GET /api/applications` - Get all applications
- `GET /api/applications/:id` - Get single application
- `POST /api/applications` - Create new application
- `PUT /api/applications/:id` - Update application
- `DELETE /api/applications/:id` - Delete application

### Interviews Endpoints
- `GET /api/interviews` - Get all interviews
- `GET /api/interviews/:id` - Get single interview
- `POST /api/interviews` - Create new interview
- `PUT /api/interviews/:id` - Update interview
- `DELETE /api/interviews/:id` - Delete interview

### Health Check
- `GET /api/health` - Server health status

## Database Schemas

### Task Schema
```javascript
{
  _id: ObjectId,
  text: String (required),
  category: String (enum: DSA, Projects, Company Research, Interview Prep, Other),
  status: String (enum: Pending, Completed),
  createdAt: Date,
  updatedAt: Date
}
```

### Application Schema
```javascript
{
  _id: ObjectId,
  company: String (required),
  role: String (required),
  appliedDate: String,
  status: String (enum: Applied, Interview, Selected, Rejected),
  createdAt: Date,
  updatedAt: Date
}
```

### Interview Schema
```javascript
{
  _id: ObjectId,
  company: String (required),
  role: String,
  interviewDate: String (required),
  interviewTime: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

All errors are returned in the following format:
```json
{
  "status": 400,
  "message": "Error description",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

## CORS Configuration

The server accepts requests from:
- `http://localhost:5175` (default frontend)
- `http://localhost:5174` (alternative frontend)
- Configurable via `CLIENT_URL` environment variable

## Project Structure

```
server/
├── models/
│   ├── Task.js
│   ├── Application.js
│   └── Interview.js
├── routes/
│   ├── tasks.js
│   ├── applications.js
│   └── interviews.js
├── middleware/
│   ├── cors.js
│   └── errorHandler.js
├── server.js
├── package.json
├── .env
├── .env.example
└── README.md
```

## Troubleshooting

### MongoDB Connection Failed
- **Issue**: `❌ MongoDB connection failed`
- **Solution**: 
  - Check if MongoDB is running
  - Verify `MONGODB_URI` in `.env`
  - For MongoDB Atlas, ensure IP is whitelisted

### Port Already in Use
- **Issue**: `Error: listen EADDRINUSE :::5000`
- **Solution**: 
  - Change `PORT` in `.env` to another value (e.g., 5001)
  - Or kill the process using port 5000

### CORS Errors
- **Issue**: Frontend getting CORS errors
- **Solution**: 
  - Update `CLIENT_URL` in `.env` to match frontend URL
  - Restart the server

### Module Import Errors
- **Issue**: `Cannot find module` errors
- **Solution**: 
  - Ensure `package.json` has `"type": "module"`
  - Check all import paths have `.js` extension

## Development Notes

- The server uses ES6 modules (import/export)
- All routes use async/await for database operations
- Mongoose schemas include timestamps for tracking
- Nodemon watches for changes and auto-restarts the server
- CORS is configured to allow all safe HTTP methods

## Next Steps

1. Start the backend server: `npm run dev`
2. Start the frontend: From project root, `npm run dev`
3. Open browser to `http://localhost:5175`
4. Test CRUD operations in the UI
5. Monitor network tab for API calls

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review `.env` configuration
3. Check MongoDB connection
4. Verify frontend is making requests to correct API URL
