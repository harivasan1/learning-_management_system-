# EduLearn LMS - API Quick Reference

## Base URL
```
http://localhost:5000/api
```

## Authentication Header
```
Authorization: Bearer {TOKEN}
```

---

## 🔐 Authentication

### Register New User
```http
POST /auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"  // "student", "teacher", or "admin"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "token": "eyJhbGc...",
    "role": "student",
    "email": "john@example.com"
  }
}
```

### Get Current User
```http
GET /auth/me
Authorization: Bearer {TOKEN}
```

---

## 📚 Courses

### Get All Courses
```http
GET /courses?category=Web Development&level=Beginner&search=Python
```

### Get Single Course
```http
GET /courses/{courseId}
```

### Create Course (Teacher/Admin)
```http
POST /courses
Authorization: Bearer {TOKEN}
Content-Type: application/json

{
  "title": "Python Basics",
  "description": "Learn Python programming",
  "category": "Web Development",
  "duration": 10,
  "level": "Beginner",
  "price": 0
}
```

### Update Course (Teacher/Admin)
```http
PUT /courses/{courseId}
Authorization: Bearer {TOKEN}
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description"
}
```

### Delete Course (Teacher/Admin)
```http
DELETE /courses/{courseId}
Authorization: Bearer {TOKEN}
```

---

## 📝 Enrollments

### Enroll in Course
```http
POST /enrollments
Authorization: Bearer {TOKEN}
Content-Type: application/json

{
  "courseId": "{courseId}"
}
```

### Get Student Enrollments
```http
GET /enrollments/student/{studentId}
Authorization: Bearer {TOKEN}
```

### Get Course Enrollments (Teacher)
```http
GET /enrollments/course/{courseId}
Authorization: Bearer {TOKEN}
```

### Update Progress
```http
PUT /enrollments/{enrollmentId}/progress
Authorization: Bearer {TOKEN}
Content-Type: application/json

{
  "moduleId": "{moduleId}",
  "lessonId": "{lessonId}"
}
```

### Complete Course
```http
PUT /enrollments/{enrollmentId}/complete
Authorization: Bearer {TOKEN}
```

---

## ✏️ Assignments

### Get Course Assignments
```http
GET /assignments/course/{courseId}
Authorization: Bearer {TOKEN}
```

### Create Assignment (Teacher/Admin)
```http
POST /assignments
Authorization: Bearer {TOKEN}
Content-Type: application/json

{
  "title": "Assignment 1",
  "description": "Complete this task",
  "course": "{courseId}",
  "dueDate": "2024-02-20T23:59:59Z",
  "points": 100
}
```

### Submit Assignment
```http
POST /assignments/{assignmentId}/submit
Authorization: Bearer {TOKEN}
Content-Type: application/json

{
  "content": "My submission text or URL"
}
```

### Grade Assignment (Teacher/Admin)
```http
PUT /assignments/{assignmentId}/grade
Authorization: Bearer {TOKEN}
Content-Type: application/json

{
  "studentId": "{studentId}",
  "grade": 85,
  "feedback": "Good work!"
}
```

### Delete Assignment
```http
DELETE /assignments/{assignmentId}
Authorization: Bearer {TOKEN}
```

---

## 🧪 Quizzes

### Get Course Quizzes
```http
GET /quizzes/course/{courseId}
Authorization: Bearer {TOKEN}
```

### Create Quiz (Teacher/Admin)
```http
POST /quizzes
Authorization: Bearer {TOKEN}
Content-Type: application/json

{
  "title": "Quiz 1",
  "course": "{courseId}",
  "questions": [
    {
      "question": "What is 2+2?",
      "questionType": "multiple-choice",
      "options": [
        { "text": "3", "isCorrect": false },
        { "text": "4", "isCorrect": true },
        { "text": "5", "isCorrect": false }
      ],
      "points": 10
    }
  ],
  "totalPoints": 100,
  "duration": 60,
  "passingScore": 70
}
```

### Submit Quiz
```http
POST /quizzes/{quizId}/submit
Authorization: Bearer {TOKEN}
Content-Type: application/json

{
  "answers": ["4"]  // Array of student answers
}

Response:
{
  "success": true,
  "data": {
    "score": 10,
    "totalPoints": 100,
    "percentage": 85,
    "passed": true
  }
}
```

### Get Quiz Results
```http
GET /quizzes/{quizId}/results/{studentId}
Authorization: Bearer {TOKEN}
```

### Delete Quiz
```http
DELETE /quizzes/{quizId}
Authorization: Bearer {TOKEN}
```

---

## 👥 Users

### Get All Users (Admin)
```http
GET /users?role=student
Authorization: Bearer {TOKEN}
```

### Get User Details
```http
GET /users/{userId}
Authorization: Bearer {TOKEN}
```

### Update User Profile
```http
PUT /users/{userId}
Authorization: Bearer {TOKEN}
Content-Type: application/json

{
  "firstName": "Updated",
  "lastName": "Name",
  "bio": "User bio",
  "phone": "+1234567890"
}
```

### Delete User (Admin)
```http
DELETE /users/{userId}
Authorization: Bearer {TOKEN}
```

### Toggle User Active Status (Admin)
```http
PUT /users/{userId}/toggle-active
Authorization: Bearer {TOKEN}
```

### Get User Statistics
```http
GET /users/{userId}/stats
Authorization: Bearer {TOKEN}
```

### Search Users
```http
GET /users/search/{query}
Authorization: Bearer {TOKEN}
```

---

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { /* data object */ },
  "count": 10
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |

---

## Example Usage (JavaScript/Fetch)

```javascript
const api = new APIClient();

// Login
const login = await api.login('user@example.com', 'password123');

// Get all courses
const courses = await api.getAllCourses();

// Enroll in course
const enrollment = await api.enrollCourse(courseId);

// Get enrollments
const enrollments = await api.getStudentEnrollments(studentId);

// Submit assignment
const submission = await api.submitAssignment(assignmentId, 'My answer');

// Submit quiz
const result = await api.submitQuiz(quizId, [answer1, answer2]);
```

---

## Rate Limiting
- No explicit rate limiting implemented (add in production)
- Recommended: 100 requests per minute per IP

## Pagination
- Not yet implemented (add for large datasets)
- Recommended: Implement with limit and offset parameters

---

For more details, see the complete SETUP_GUIDE.md
