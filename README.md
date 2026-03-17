# 🎓 EduLearn - Complete Learning Management System

A comprehensive, production-ready Learning Management System (LMS) built with modern web technologies. EduLearn enables instructors to create and manage courses while allowing students to enroll, learn, and evaluate their understanding through interactive quizzes and assignments.

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Modules & Functionality](#modules--functionality)
- [Installation Guide](#installation-guide)
- [API Documentation](#api-documentation)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

**EduLearn** is a web-based Learning Management System designed to overcome traditional classroom limitations. The system provides a centralized platform where:

- **Instructors** can create courses, upload learning materials, manage content, and evaluate student performance
- **Students** can browse courses, enroll, access materials, and take quizzes at their own pace
- **Administrators** can manage users, courses, and system analytics

The system improves accessibility to learning resources and supports flexible, interactive learning environments with modern educational technology.

## ✨ Key Features

### 🔐 Authentication & Authorization
- User registration with role-based selection (Student, Teacher, Admin)
- Secure login with JWT token-based authentication
- Role-based access control (RBAC) for protected routes
- Password encryption with bcryptjs
- Session management and token validation

### 📚 Course Management
- Course creation and management by instructors
- Organize courses into modules and lessons
- Upload and manage learning materials (documents, videos, notes)
- Search and filter courses by category
- Course enrollment statistics and tracking
- Publish/unpublish courses

### 👨‍🎓 Student Enrollment
- Browse available courses with detailed descriptions
- One-click course enrollment
- Track enrollment status and progress
- Access enrolled course materials
- View course completion percentage

### 📖 Content Access
- Structured learning materials organization
- Support for multiple content types (PDFs, videos, text notes, study guides)
- Easy-to-navigate content viewer
- Download learning resources
- Bookmark important sections

### ✅ Quiz & Assessment System
- Interactive quiz creation with multiple-choice questions
- Automated quiz evaluation and scoring
- Instant feedback on quiz attempts
- Quiz attempt history and analytics
- Score tracking and performance metrics
- Different difficulty levels for questions

### 🎯 Assignments
- Assignment creation and distribution
- Student submission tracking
- Grading system with feedback
- Deadline management
- Assignment progress monitoring

### 📊 Performance & Analytics
- Student performance dashboard
- Quiz score analytics
- Course completion tracking
- Learning progress visualization
- Performance reports for instructors

### 🔔 User Management
- User profile management
- Role-based user administration
- User statistics and activity tracking
- Instructor and student lists

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing

### Frontend
- **Markup**: HTML5
- **Styling**: CSS3
- **Client Logic**: Vanilla JavaScript
- **Architecture**: Client-Server Model

### Development
- **Package Manager**: npm
- **Environment Management**: dotenv
- **API Style**: RESTful

## 📁 Project Structure

```
learning-_management_system/
│
├── lms-full-st/                    # Main project folder
│   │
│   ├── server/                     # Backend (Node.js + Express)
│   │   ├── config/
│   │   │   └── database.js         # MongoDB connection
│   │   │
│   │   ├── controllers/            # Business logic
│   │   │   ├── authController.js
│   │   │   ├── courseController.js
│   │   │   ├── enrollmentController.js
│   │   │   ├── assignmentController.js
│   │   │   ├── quizController.js
│   │   │   └── userController.js
│   │   │
│   │   ├── models/                 # Database schemas
│   │   │   ├── User.js
│   │   │   ├── Course.js
│   │   │   ├── Enrollment.js
│   │   │   ├── Assignment.js
│   │   │   └── Quiz.js
│   │   │
│   │   ├── routes/                 # API endpoints
│   │   │   ├── authRoutes.js
│   │   │   ├── courseRoutes.js
│   │   │   ├── enrollmentRoutes.js
│   │   │   ├── assignmentRoutes.js
│   │   │   ├── quizRoutes.js
│   │   │   └── userRoutes.js
│   │   │
│   │   ├── middleware/
│   │   │   └── auth.js             # JWT authentication middleware
│   │   │
│   │   ├── utils/
│   │   │   └── helpers.js          # Utility functions
│   │   │
│   │   ├── server.js               # Express server setup
│   │   ├── package.json
│   │   ├── .env.example            # Environment template
│   │   └── .gitignore
│   │
│   ├── client/                     # Frontend (HTML/CSS/JS)
│   │   ├── public/
│   │   │   ├── css/
│   │   │   │   └── style.css
│   │   │   ├── js/
│   │   │   │   ├── api.js
│   │   │   │   ├── auth.js
│   │   │   │   ├── courses.js
│   │   │   │   └── dashboard.js
│   │   │   ├── images/
│   │   │   └── assets/
│   │   │
│   │   └── views/
│   │       ├── common/
│   │       │   ├── index.html
│   │       │   ├── login.html
│   │       │   ├── register.html
│   │       │   └── 404.html
│   │       ├── student/
│   │       ├── teacher/
│   │       └── admin/
│   │
│   ├── README.md
│   ├── SETUP_GUIDE.md
│   ├── API_REFERENCE.md
│   ├── FOLDER_STRUCTURE.md
│   └── COMPLETION_SUMMARY.md
│
├── schema-lms-db-users-mongoDBJSON.json
├── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or MongoDB Atlas account)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd learning-_management_system
   ```

2. **Install server dependencies**
   ```bash
   cd lms-full-st/server
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB connection string and other settings
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5000
   ```

## 📚 Modules & Functionality

### 1. **User Authentication Module**
Manages user registration, login, and access control
- User registration with role selection
- Secure login with JWT tokens
- Role-based authorization
- Session management

### 2. **Course Management Module**
Enables instructors to create and manage courses
- Create/edit/delete courses
- Upload learning materials
- Organize content into modules
- Track course enrollment

### 3. **Student Enrollment Module**
Allows students to discover and enroll in courses
- Browse available courses
- Enroll in courses
- Track enrollment status
- Access enrolled course materials

### 4. **Content Access Module**
Provides structured access to learning materials
- View course content
- Download resources
- Navigate modules and lessons
- Track learning progress

### 5. **Quiz Management Module**
Enables creation and management of quizzes
- Create multiple-choice quizzes
- Define correct answers and scoring
- Track quiz attempts
- Provide instant feedback

### 6. **Performance Tracking Module**
Monitors and reports on student progress
- Quiz score analytics
- Course completion tracking
- Student performance reports
- Progress visualization

## 🔧 Installation Guide

See [SETUP_GUIDE.md](lms-full-st/SETUP_GUIDE.md) for detailed installation and configuration instructions.

## 📡 API Documentation

See [API_REFERENCE.md](lms-full-st/API_REFERENCE.md) for complete API endpoint documentation.

### Main API Endpoints

**Authentication**
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
```

**Courses**
```
GET    /api/courses
POST   /api/courses
GET    /api/courses/:id
PUT    /api/courses/:id
DELETE /api/courses/:id
```

**Enrollments**
```
POST   /api/enrollments
GET    /api/enrollments
GET    /api/enrollments/:id
PUT    /api/enrollments/:id
```

**Quizzes**
```
GET    /api/quizzes
POST   /api/quizzes
POST   /api/quizzes/:id/submit
GET    /api/quizzes/:id/results
```

**Assignments**
```
GET    /api/assignments
POST   /api/assignments
POST   /api/assignments/:id/submit
GET    /api/assignments/:id/submissions
```

## 🎨 User Interface

### Student Dashboard
- Enrolled courses overview
- Course progress tracking
- Assignment and quiz status
- Performance statistics
- Quick access to learning materials

### Teacher Dashboard
- Created courses management
- Student enrollment statistics
- Quiz and assignment grading
- Performance analytics
- Course content management

### Admin Dashboard
- User management
- System analytics
- Course moderation
- Report generation
- Settings management

## 🚀 Future Enhancements

Our roadmap includes the following features for future development:

### Phase 2 Features
- [ ] **Live Video Lectures** - Real-time video streaming for interactive classes
- [ ] **Discussion Forums** - Student-to-student and instructor-to-student communication
- [ ] **Certificate Generation** - Automated certificates upon course completion
- [ ] **Advanced Analytics** - Detailed performance reports and learning insights
- [ ] **Mobile Application** - Native iOS/Android app for on-the-go learning
- [ ] **Notifications System** - Real-time alerts for assignments, quiz deadlines, and messages
- [ ] **Content Recommendations** - AI-powered course recommendations based on learning history
- [ ] **Gamification** - Badges, points, and leaderboards to increase engagement
- [ ] **Offline Access** - Download course materials for offline learning
- [ ] **Integration APIs** - Connect with third-party educational tools

### Phase 3 Features
- [ ] **Artificial Intelligence** - Personalized learning paths using AI
- [ ] **Accessibility Features** - Screen reader support, captions, multiple languages
- [ ] **Video Content Management** - Built-in video hosting and streaming
- [ ] **Plagiarism Detection** - Check assignments for originality
- [ ] **Student Groups** - Collaborative learning projects

## 📊 Project Status

✅ **Core Features Completed**
- Authentication system with JWT
- Complete course management
- Student enrollment system
- Quiz creation and evaluation
- Assignment management
- User management interface
- Performance tracking dashboard

🔄 **In Progress**
- Enhanced UI/UX improvements
- Performance optimization
- Database indexing for scalability

📅 **Upcoming**
- Live video lecture support
- Discussion forum module
- Certificate generation system
- Mobile responsive design improvements

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Code Style

- Use meaningful variable and function names
- Add comments for complex logic
- Follow consistent indentation (2 spaces)
- Test your changes before submitting

## 🔒 Security

- Sensitive values are managed through `.env` files
- Never commit `.env` to version control
- Passwords are hashed using bcryptjs
- All protected routes require JWT authentication
- Input validation implemented on all endpoints

## 📄 License

This project is open source and available under the MIT License.

## 👥 Acknowledgment

This Learning Management System was developed as an educational project to demonstrate modern web development practices and full-stack application architecture using Node.js, Express, MongoDB, and vanilla JavaScript.

## 📞 Support

For issues, questions, or suggestions, please open an issue in the repository or contact the development team.

## 📖 Documentation

- [Setup Guide](lms-full-st/SETUP_GUIDE.md) - Detailed installation instructions
- [API Reference](lms-full-st/API_REFERENCE.md) - Complete API documentation
- [Completion Summary](lms-full-st/COMPLETION_SUMMARY.md) - Project status and features
- [Folder Structure](lms-full-st/FOLDER_STRUCTURE.md) - Detailed directory layout

---

**Last Updated:** March 17, 2026

*EduLearn LMS - Making Education Accessible and Flexible*
