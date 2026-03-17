# 🚀 EduLearn LMS - Complete Setup Guide

## Project Overview
EduLearn is a full-featured Learning Management System built with:
- **Frontend**: HTML5, CSS3, Bootstrap 5, Vanilla JavaScript
- **Backend**: Node.js, Express.js, MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MongoDB (Cloud hosted with Atlas)

## 📋 Features Implemented

### Core Features
✅ User Authentication (Login/Register)
- Student, Teacher, and Admin roles
- JWT token-based authentication
- Password hashing with bcryptjs

✅ Course Management
- Create, read, update, delete courses
- Course categories and difficulty levels
- Course enrollment system
- Modules and lessons within courses

✅ Assignments
- Create and assign assignments
- Student submissions
- Grade assignments with feedback
- Track submission status

✅ Quizzes
- Create quizzes with multiple question types
- Student quiz attempts with scoring
- Automatic grading
- Multiple attempt support

✅ User Management
- User profiles and statistics
- Role-based access control
- User activity tracking

✅ Dashboards
- Student dashboard with enrolled courses
- Teacher dashboard for course management
- Admin dashboard for user management (coming soon)

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (free tier available)
- npm or yarn package manager

### Step 1: Install Dependencies

```bash
# Backend dependencies
cd server
npm install

# Frontend - uses CDN, no installation needed
```

### Step 2: Configure Environment Variables

Edit `server/.env` file with your MongoDB Atlas connection:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database - MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/lms-db?retryWrites=true&w=majority

# JWT Secret (change this in production!)
JWT_SECRET=your-super-secret-jwt-key

# Other optional configs...
```

**To get your MongoDB Atlas URI:**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Replace `username` and `password` with your credentials

### Step 3: Start the Server

```bash
# From the server directory
npm run dev    # For development with auto-reload
# OR
npm start       # For production
```

The server will start at: **http://localhost:5000**

### Step 4: Access the Application

Open your browser and navigate to:
```
http://localhost:5000
```

## 📚 Demo Credentials

For quick testing without backend:

| Role | Email | Password |
|------|-------|----------|
| Student | student@demo.com | demo1234 |
| Teacher | teacher@demo.com | demo1234 |
| Admin | admin@demo.com | demo1234 |

## 🏗️ Project Structure

```
lms-full-st/
├── server/
│   ├── models/              # MongoDB schemas
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Assignment.js
│   │   ├── Enrollment.js
│   │   └── Quiz.js
│   ├── controllers/         # Business logic
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── enrollmentController.js
│   │   ├── assignmentController.js
│   │   ├── quizController.js
│   │   └── userController.js
│   ├── routes/              # API endpoints
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── enrollmentRoutes.js
│   │   ├── assignmentRoutes.js
│   │   ├── quizRoutes.js
│   │   └── userRoutes.js
│   ├── middleware/          # Custom middleware
│   │   └── auth.js
│   ├── config/              # Configuration
│   │   └── database.js
│   ├── server.js            # Express app entry
│   ├── package.json
│   └── .env                 # Environment variables
└── client/
    ├── public/
    │   ├── css/
    │   │   └── style.css
    │   └── js/
    │       ├── api.js       # API client class
    │       ├── auth.js      # Authentication logic
    │       └── dashboard.js # Dashboard logic
    └── views/
        ├── common/
        │   ├── index.html   # Login page
        │   └── register.html
        ├── student/
        │   └── dashboard.html
        ├── teacher/
        │   └── dashboard.html
        └── admin/
            └── dashboard.html
```

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get specific course
- `POST /api/courses` - Create course (teacher/admin)
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Enrollments
- `POST /api/enrollments` - Enroll in course
- `GET /api/enrollments/student/:studentId` - Get student enrollments
- `GET /api/enrollments/course/:courseId` - Get course enrollments
- `PUT /api/enrollments/:id/progress` - Update progress
- `PUT /api/enrollments/:id/complete` - Mark course complete

### Assignments
- `GET /api/assignments/course/:courseId` - Get course assignments
- `POST /api/assignments` - Create assignment
- `POST /api/assignments/:id/submit` - Submit assignment
- `PUT /api/assignments/:id/grade` - Grade submission
- `DELETE /api/assignments/:id` - Delete assignment

### Quizzes
- `GET /api/quizzes/course/:courseId` - Get course quizzes
- `POST /api/quizzes` - Create quiz
- `POST /api/quizzes/:id/submit` - Submit quiz answers
- `GET /api/quizzes/:id/results/:studentId` - Get quiz results
- `DELETE /api/quizzes/:id` - Delete quiz

### Users
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin)
- `GET /api/users/:id/stats` - Get user statistics

## 🧪 Testing the API

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","password":"password123","role":"student"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Create Course (replace TOKEN with actual token)
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"Python Basics","description":"Learn Python","category":"Web Development","duration":10,"level":"Beginner"}'
```

### Using Postman

1. Import the API endpoints into Postman
2. Set up Authorization with Bearer Token
3. Test each endpoint

## ⚠️ Important Notes

1. **In Production:**
   - Change `JWT_SECRET` to a strong, random string
   - Set `NODE_ENV=production`
   - Use HTTPS instead of HTTP
   - Enable CORS properly
   - Add rate limiting
   - Validate all inputs

2. **Database:**
   - Regularly backup your MongoDB database
   - Monitor database performance
   - Set up proper indexes

3. **Security:**
   - Never commit `.env` file to git
   - Use environment variables for secrets
   - Validate user input on both client and server
   - Implement CSRF protection if forms are used

## 🐛 Troubleshooting

### Server won't start
```bash
# Check if port 5000 is in use
# Windows
netstat -ano | findstr :5000

# Mac/Linux
lsof -i :5000

# Kill process if needed and restart
```

### MongoDB connection fails
- Verify connection string in `.env`
- Check MongoDB Atlas IP whitelist
- Ensure database credentials are correct
- Try connecting from MongoDB Compass first

### CORS errors
- Check that frontend URL matches CORS settings in server
- Ensure Authorization header is properly included

### Login not working
- Check email/password in request
- Verify user exists in database
- Check JWT_SECRET matches token generation

## 📞 Support

For issues and questions:
1. Check the troubleshooting section above
2. Review MongoDB and Node.js documentation
3. Check browser console for errors
4. Check server logs for error messages

## 🎯 Next Steps

1. **Enhance Frontend**
   - Add more dashboard pages
   - Create course detail page
   - Add course enrollment UI
   - Build quiz UI

2. **Add Features**
   - File uploads for courses
   - Video hosting
   - Discussion forums
   - Email notifications
   - Payment integration

3. **Optimize**
   - Add caching
   - Implement pagination
   - Add search functionality
   - Optimize database queries

4. **Deploy**
   - Use Heroku, Vercel, or AWS
   - Set up continuous integration
   - Add monitoring and logging
   - Configure CDN for static assets

## 📄 License

MIT License - feel free to use this project for learning and development.

---

Happy Learning! 🎓

Questions? Check the documentation or create an issue on GitHub.
