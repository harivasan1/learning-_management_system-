# 🚀 LMS Project - Quick Start Guide

## 📦 What's in this ZIP?

Complete Learning Management System with:
- ✅ Node.js + Express Backend
- ✅ MongoDB Database Models
- ✅ JWT Authentication
- ✅ RESTful API
- ✅ Responsive Frontend (HTML/CSS/Bootstrap/JS)
- ✅ Role-based Access (Student/Teacher/Admin)

---

## 🎯 Installation Steps

### Step 1: Extract the ZIP
```bash
unzip lms-project-complete.zip
cd lms-project
```

### Step 2: Install Backend Dependencies
```bash
cd server
npm install
```

This will install:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cors

### Step 3: Setup Environment Variables
```bash
# Copy the example file
cp .env.example .env

# Edit with your settings
nano .env
```

**Minimum required in .env:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lms-db
JWT_SECRET=your-secret-key-change-this
```

### Step 4: Start MongoDB
```bash
# Option A: Local MongoDB
mongod

# Option B: Use MongoDB Atlas
# Just update MONGODB_URI in .env with your Atlas connection string
```

### Step 5: Run the Server
```bash
# Development mode (auto-restart on changes)
npm run dev

# OR Production mode
npm start
```

### Step 6: Access the Application
Open browser: **http://localhost:5000**

---

## 🔐 Demo Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Student | student@demo.com | student123 |
| Teacher | teacher@demo.com | teacher123 |
| Admin | admin@demo.com | admin123 |

*Note: These work in demo mode if backend is not connected*

---

## 📁 Project Structure

```
lms-project/
├── server/                    # Backend
│   ├── config/               # Database config
│   ├── controllers/          # Business logic
│   ├── models/               # MongoDB schemas
│   ├── routes/               # API endpoints
│   ├── middleware/           # Authentication
│   └── server.js             # Main entry
│
├── client/                   # Frontend
│   ├── public/
│   │   ├── css/             # Stylesheets
│   │   └── js/              # Client scripts
│   └── views/               # HTML pages
│       ├── common/          # Login, Register
│       ├── student/         # Student pages
│       ├── teacher/         # Teacher pages
│       └── admin/           # Admin pages
│
└── README.md                # Full documentation
```

---

## 🛠️ API Endpoints

### Authentication
```
POST   /api/auth/register    - Register user
POST   /api/auth/login       - Login user
GET    /api/auth/me          - Get current user
POST   /api/auth/logout      - Logout
```

### Courses
```
GET    /api/courses          - Get all courses
GET    /api/courses/:id      - Get single course
POST   /api/courses          - Create course (Teacher)
PUT    /api/courses/:id      - Update course (Teacher)
DELETE /api/courses/:id      - Delete course (Teacher)
```

### Users
```
GET    /api/users            - Get all users (Admin)
GET    /api/users/:id        - Get user by ID
PUT    /api/users/:id        - Update user
DELETE /api/users/:id        - Delete user (Admin)
```

---

## 🎨 Features Included

### Students Can:
- ✅ Register and login
- ✅ Browse courses
- ✅ Enroll in courses
- ✅ Track progress
- ✅ Submit assignments
- ✅ View grades

### Teachers Can:
- ✅ Create courses
- ✅ Upload materials
- ✅ Create assignments
- ✅ Grade submissions
- ✅ Track student progress

### Admins Can:
- ✅ Manage all users
- ✅ Moderate courses
- ✅ View analytics
- ✅ System settings

---

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Run in development mode (nodemon)
npm run dev

# Run in production mode
npm start

# Test API endpoints
# Use Postman or Thunder Client
```

---

## 📊 Database Models

### User
- firstName, lastName, email, password (hashed)
- role: student | teacher | admin
- enrolledCourses[], createdCourses[]

### Course
- title, description, instructor
- modules[], lessons[], videos
- enrolledStudents[], rating

### Assignment
- title, description, dueDate
- submissions[], grades[]

### Enrollment
- student, course
- progress[], completionPercentage

---

## 🐛 Troubleshooting

### Port already in use
```bash
# Change PORT in .env file
PORT=3000
```

### MongoDB connection failed
```bash
# Check MongoDB is running
mongod --version

# Or use MongoDB Atlas cloud database
# Update MONGODB_URI in .env
```

### npm install errors
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Documentation

- **Full README**: See `README.md`
- **Folder Structure**: See `FOLDER_STRUCTURE.md`
- **API Docs**: In README.md under "API Endpoints"

---

## 🚀 Next Steps

1. ✅ Backend is ready to use
2. ⏳ Add more frontend pages (see views folders)
3. ⏳ Implement file upload for course materials
4. ⏳ Add real-time chat with Socket.io
5. ⏳ Integrate payment gateway
6. ⏳ Deploy to Heroku/Vercel/AWS

---

## 🆘 Need Help?

1. Check `README.md` for detailed documentation
2. Review API endpoints in README
3. Check MongoDB connection
4. Verify all environment variables are set

---

## 📝 License

MIT License - Free to use for educational and commercial purposes

---

**Built with ❤️ for Education**

Version: 1.0.0 | February 2026
