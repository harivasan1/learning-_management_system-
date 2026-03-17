# Learning Management System (LMS) Project Documentation

## 1. Project Overview
The Learning Management System (LMS) is a web-based platform designed to facilitate online learning. It provides features for students, teachers, and administrators, including course management, user authentication, and progress tracking.

### Key Features:
- User authentication and role-based access control.
- Course creation, enrollment, and progress tracking.
- Dashboards for students, teachers, and administrators.
- Responsive user interface for seamless interaction.

---

## 2. Backend Details

### Folder Structure:
```
lms-full-st/server/
├── config/                # Configuration files (e.g., database connection)
├── controllers/           # API controllers for handling requests
├── middleware/            # Middleware for authentication and error handling
├── models/                # Mongoose models for MongoDB collections
├── routes/                # API route definitions
├── utils/                 # Utility functions
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
```

### Key Files:
- **`server.js`**: Entry point for the backend server.
- **`config/database.js`**: Handles MongoDB connection.
- **`controllers/authController.js`**: Manages authentication-related APIs.
- **`models/User.js`**: Defines the schema for the `users` collection.

### API Endpoints:
- **Authentication**:
  - `POST /api/auth/register`: Register a new user.
  - `POST /api/auth/login`: Log in a user.
  - `GET /api/auth/me`: Get the current logged-in user's details.
  - `POST /api/auth/logout`: Log out a user.
- **Courses**:
  - `GET /api/courses`: Fetch all courses.
  - `POST /api/courses`: Create a new course.

### Database:
- **MongoDB**:
  - Database Name: `lms-db`
  - Collections: `users`, `courses`, `enrollments`

---

## 3. Frontend Details

### Folder Structure:
```
lms-full-st/client/
├── public/                # Static assets (CSS, JS, images)
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   └── images/            # Images
├── views/                 # HTML templates
│   ├── admin/             # Admin-specific pages
│   ├── student/           # Student-specific pages
│   ├── teacher/           # Teacher-specific pages
│   └── common/            # Common pages (e.g., login, register)
├── README.md              # Frontend documentation
```

### Key Files:
- **`public/js/api.js`**: Handles API requests to the backend.
- **`public/js/auth.js`**: Manages authentication workflows on the frontend.
- **`views/common/index.html`**: Landing page for the application.

### User Interface:
- **Login and Registration**:
  - Users can log in or register based on their role (student, teacher, admin).
- **Dashboards**:
  - Role-specific dashboards for managing courses, assignments, and analytics.

---

## 4. Setup and Execution

### Prerequisites:
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)

### Steps:
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd learning-_management_system
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the environment variables:
   - Copy `.env.example` to `.env` and update the values.
5. Start the backend server:
   ```bash
   cd lms-full-st/server
   node server.js
   ```
6. Open the application in a browser:
   ```
   http://localhost:5000
   ```

---

## 5. Testing and Validation

### Key Features to Test:
1. **Authentication**:
   - Register a new user.
   - Log in with valid credentials.
   - Access role-specific dashboards.
2. **Course Management**:
   - Create, update, and delete courses.
   - Enroll in courses and track progress.
3. **Error Handling**:
   - Test invalid inputs and ensure proper error messages are displayed.

### Tools:
- Use Postman to test API endpoints.
- Open the browser console to debug frontend issues.

---

## 6. Current Status

### Backend:
- The backend server is running successfully on `http://localhost:5000`.
- MongoDB is connected, and the database `lms-db` is accessible.
- All API endpoints have been validated and are functioning correctly.

### Frontend:
- The frontend files have no syntax or linting errors.
- The user interface is integrated with the backend and ready for testing.

### Next Steps:
1. Test the application in a browser to validate the full workflow.
2. Verify role-specific dashboards and course management features.
3. Address any issues encountered during testing.

---

This document provides a comprehensive overview of the Learning Management System project, including its structure, functionality, and setup instructions. For further assistance, feel free to reach out!