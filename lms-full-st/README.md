# EduLearn - Learning Management System (LMS)

A full-stack Learning Management System built with Node.js, Express, MongoDB, and vanilla JavaScript.

## 📁 Project Structure

```
lms-project/
│
├── server/                          # Backend (Node.js + Express)
│   ├── config/
│   │   └── database.js              # MongoDB connection config
│   │
│   ├── controllers/
│   │   ├── authController.js        # Authentication logic
│   │   └── courseController.js      # Course CRUD operations
│   │
│   ├── models/
│   │   ├── User.js                  # User schema (Student/Teacher/Admin)
│   │   ├── Course.js                # Course schema with modules
│   │   ├── Assignment.js            # Assignment & submissions
│   │   └── Enrollment.js            # Student enrollment & progress
│   │
│   ├── routes/
│   │   ├── authRoutes.js            # /api/auth/* routes
│   │   ├── userRoutes.js            # /api/users/* routes
│   │   ├── courseRoutes.js          # /api/courses/* routes
│   │   ├── enrollmentRoutes.js      # /api/enrollments/* routes
│   │   └── assignmentRoutes.js      # /api/assignments/* routes
│   │
│   ├── middleware/
│   │   └── auth.js                  # JWT authentication & authorization
│   │
│   ├── utils/                       # Helper functions (future)
│   │
│   ├── .env.example                 # Environment variables template
│   ├── package.json                 # Server dependencies
│   └── server.js                    # Main server file
│
├── client/                          # Frontend (HTML/CSS/JS)
│   ├── public/
│   │   ├── css/
│   │   │   └── style.css            # Main stylesheet
│   │   │
│   │   ├── js/
│   │   │   └── auth.js              # Authentication logic
│   │   │
│   │   ├── images/                  # Static images
│   │   └── assets/                  # Other assets
│   │
│   └── views/
│       ├── common/
│       │   ├── index.html           # Login page
│       │   └── register.html        # Registration page
│       │
│       ├── student/
│       │   ├── dashboard.html       # Student dashboard
│       │   ├── courses.html         # My courses
│       │   ├── course-detail.html   # Course viewer
│       │   └── assignments.html     # Assignments list
│       │
│       ├── teacher/
│       │   ├── dashboard.html       # Teacher dashboard
│       │   ├── courses.html         # Manage courses
│       │   └── students.html        # Student management
│       │
│       └── admin/
│           ├── dashboard.html       # Admin dashboard
│           ├── users.html           # User management
│           └── analytics.html       # Platform analytics
│
└── README.md                        # This file
```

## 🚀 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Environment**: dotenv

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom styles with Bootstrap 5.3
- **JavaScript** - Vanilla JS with Fetch API
- **UI Framework**: Bootstrap 5.3
- **Icons**: Font Awesome 6.4
- **Charts**: Chart.js (for analytics)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd lms-project
```

### Step 2: Install Backend Dependencies
```bash
cd server
npm install
```

### Step 3: Configure Environment Variables
```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your settings
nano .env
```

Required environment variables:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/lms-db
JWT_SECRET=your-super-secret-key
```

### Step 4: Start MongoDB
```bash
# If using local MongoDB
mongod

# Or make sure MongoDB Atlas connection string is in .env
```

### Step 5: Start the Server
```bash
# Development mode with nodemon
npm run dev

# Or production mode
npm start
```

Server will run on `http://localhost:5000`

### Step 6: Access the Application
Open your browser and navigate to:
```
http://localhost:5000
```

## 🔐 Demo Credentials

### For Testing (Demo Mode)
If backend is not running, these credentials work in demo mode:

| Role | Email | Password |
|------|-------|----------|
| Student | student@demo.com | student123 |
| Teacher | teacher@demo.com | teacher123 |
| Admin | admin@demo.com | admin123 |

### For Production
Register new users through `/register` endpoint or create via API.

## 🛠️ API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/auth/me          - Get current user (Protected)
POST   /api/auth/logout      - Logout user (Protected)
```

### Courses
```
GET    /api/courses                      - Get all courses
GET    /api/courses/:id                  - Get single course
POST   /api/courses                      - Create course (Teacher/Admin)
PUT    /api/courses/:id                  - Update course (Teacher/Admin)
DELETE /api/courses/:id                  - Delete course (Teacher/Admin)
GET    /api/courses/instructor/:id       - Get instructor's courses
```

### Users
```
GET    /api/users           - Get all users (Admin)
GET    /api/users/:id       - Get user by ID (Protected)
PUT    /api/users/:id       - Update user (Protected)
DELETE /api/users/:id       - Delete user (Admin)
```

### Enrollments
```
POST   /api/enrollments                    - Enroll in course (Student)
GET    /api/enrollments/student/:id        - Get student enrollments
PUT    /api/enrollments/:id/progress       - Update progress
```

### Assignments
```
GET    /api/assignments/course/:courseId           - Get course assignments
POST   /api/assignments                            - Create assignment (Teacher)
POST   /api/assignments/:id/submit                 - Submit assignment (Student)
PUT    /api/assignments/:id/submissions/:sid/grade - Grade assignment (Teacher)
```

## 📊 Database Models

### User Model
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  role: String (student|teacher|admin),
  avatar: String,
  phone: String,
  bio: String,
  enrolledCourses: [CourseId],
  createdCourses: [CourseId],
  isActive: Boolean,
  timestamps: true
}
```

### Course Model
```javascript
{
  title: String,
  description: String,
  instructor: UserId,
  category: String,
  thumbnail: String,
  modules: [{
    title: String,
    lessons: [{
      title: String,
      type: String (video|document|quiz),
      content: String,
      duration: Number
    }]
  }],
  duration: Number,
  level: String (Beginner|Intermediate|Advanced),
  price: Number,
  enrolledStudents: [UserId],
  rating: Number,
  reviews: Array,
  status: String,
  timestamps: true
}
```

### Assignment Model
```javascript
{
  title: String,
  description: String,
  course: CourseId,
  dueDate: Date,
  points: Number,
  submissions: [{
    student: UserId,
    content: String,
    attachments: Array,
    grade: Number,
    feedback: String,
    submittedAt: Date
  }],
  timestamps: true
}
```

### Enrollment Model
```javascript
{
  student: UserId,
  course: CourseId,
  enrolledAt: Date,
  progress: [{
    moduleId: ObjectId,
    lessonId: ObjectId,
    completed: Boolean,
    completedAt: Date
  }],
  completionPercentage: Number,
  status: String (active|completed|dropped),
  grade: Number,
  certificateIssued: Boolean,
  timestamps: true
}
```

## 🎨 Features

### For Students
✅ User registration and authentication
✅ Browse and enroll in courses
✅ Watch video lectures
✅ Track course progress
✅ Submit assignments
✅ View grades and feedback
✅ Discussion forums
✅ Certificate download

### For Teachers
✅ Create and manage courses
✅ Upload course materials
✅ Create assignments and quizzes
✅ Grade student submissions
✅ View student progress
✅ Send announcements
✅ Generate reports

### For Administrators
✅ User management (CRUD)
✅ Course approval and moderation
✅ Platform analytics
✅ System settings
✅ Revenue tracking
✅ Database management

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT authentication
- Protected routes with middleware
- Role-based access control
- Input validation
- CORS configuration
- Environment variable protection

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test
```

## 📈 Future Enhancements

- [ ] Real-time chat with Socket.io
- [ ] Video conferencing integration
- [ ] Payment gateway (Stripe/PayPal)
- [ ] Email notifications
- [ ] File upload with Multer
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] AI-powered recommendations
- [ ] Gamification (badges, points)
- [ ] Multi-language support
- [ ] Dark mode

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Developer Notes

### Adding New Features

1. **Create Model** → `server/models/NewModel.js`
2. **Create Controller** → `server/controllers/newController.js`
3. **Create Routes** → `server/routes/newRoutes.js`
4. **Add to server.js** → Import and use routes
5. **Create Frontend** → Add HTML pages in `client/views`
6. **Add JS Logic** → Create corresponding JS in `client/public/js`

### Running in Production

```bash
# Set environment to production
NODE_ENV=production

# Use process manager like PM2
pm2 start server/server.js --name "lms-server"
```

### Database Backup

```bash
# Backup MongoDB
mongodump --db lms-db --out /backup/folder

# Restore MongoDB
mongorestore --db lms-db /backup/folder/lms-db
```

## 📞 Support

For issues, questions, or contributions:
- Create an issue on GitHub
- Email: support@edulearn.com
- Documentation: https://docs.edulearn.com

## 🙏 Acknowledgments

- Bootstrap team for the UI framework
- Font Awesome for icons
- MongoDB team for the database
- Express.js community

---

**Built with ❤️ for Education**

Made by [Your Name] | 2026
