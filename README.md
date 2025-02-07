# eDnevnik - Electronic Gradebook System

A web-based application designed for schools to manage student records, track grades, and facilitate communication between teachers, students, and administrators.

## 🚀 Features

- **User Authentication**: Secure login for administrators, teachers, and students.
- **Role-Based Access Control**: Permissions for administrators, teachers, and students.
- **Student Management**: Add, update, and delete student records.
- **Grade Management**: Teachers can assign and update student grades.
- **Class Management**: Organize students into classes and assign teachers to subjects.
- **Performance Tracking**: View individual student performance and class performance trends.
- **Responsive Design**: Accessible across multiple devices.

## 🛠️ Technologies Used

- **Backend**:
  - **Node.js**: JavaScript runtime environment.
  - **Express.js**: Web application framework for Node.js.
  - **PostgreSQL**: SQL-based relational database.
- **Frontend**:
  - **EJS (Embedded JavaScript)**: Templating engine.
  - **HTML5 & CSS3**: Structure and styling of the web pages.
  - **JavaScript**: Client-side scripting.
  - **Bootstrap**: Responsive UI components.
- **Authentication & Authorization**:
  - **JWT (JSON Web Token)**: Secure token-based authentication.
  - **BCrypt.js**: Password hashing for security.
- **Middleware**:
  - **Express-Session**: Session management.

## 📂 Project Structure

```
eDnevnik/
├── config/                 # Configuration files (database, authentication)
├── controllers/            # Route handlers and business logic
├── middleware/             # Custom middleware functions
├── models/                 # Sequelize models
├── public/                 # Static assets (CSS, JavaScript files)
├── routes/                 # Application routes
├── views/                  # EJS templates for UI rendering
├── .gitignore              # Git ignored files
├── README.md               # Project documentation
├── app.js                  # Main application file
├── package.json            # Project metadata and dependencies
└── package-lock.json       # Exact versions of npm dependencies
```

## 📜 API Routes

### **Authentication Routes**
- **POST** `/register` → Register a new user.
- **POST** `/login` → Authenticate user and generate JWT token.
- **GET** `/logout` → Logout user and destroy session.

### **Student Routes**
- **GET** `/students` → Retrieve all students.
- **POST** `/students` → Add a new student.
- **PUT** `/students/:id` → Update student details.
- **DELETE** `/students/:id` → Delete a student record.

### **Grade Routes**
- **GET** `/grades` → Retrieve all grades.
- **POST** `/grades` → Assign a new grade.
- **PUT** `/grades/:id` → Update an existing grade.
- **DELETE** `/grades/:id` → Remove a grade.

### **Class Routes**
- **GET** `/classes` → Retrieve all classes.
- **POST** `/classes` → Create a new class.
- **PUT** `/classes/:id` → Update class information.
- **DELETE** `/classes/:id` → Remove a class.

## 🔒 Authentication & Middleware

- **JWT-Based Authentication**: Secure user authentication with token-based sessions.
- **Password Hashing**: Ensures user passwords are securely stored in the database.
- **Role-Based Access Control**: Restricts access to certain routes based on user roles.
- **Input Validation**: Prevents malicious input through request validation.

## 📋 Usage

1. **Administrator Actions**:
   - Add, edit, and remove students.
   - Manage teachers and assign them to subjects.
   - View student performance analytics.

2. **Teacher Actions**:
   - Assign grades to students.
   - View class performance.
   - Manage attendance records.

3. **Student Actions**:
   - View assigned grades.

## 🔒 Security Considerations

- **Password Security**: BCrypt is used to hash user passwords.
- **Input Validation**: Prevents SQL injection and cross-site scripting attacks.
- **Session Management**: Ensures secure authentication and session handling.


