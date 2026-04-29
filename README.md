# 📝 Feedback Management System

A full-stack web application to collect, manage, and track user feedback with review status functionality.

## 🌟 Live Demo

[View Live Application](#) <!-- vercel url -->

## 📋 Features

### Core Features
- ✅ **Submit Feedback** - Users can submit feedback with name, email, and message
- ✅ **View All Feedback** - Display all feedback entries in a responsive grid layout
- ✅ **Delete Feedback** - Remove unwanted or spam feedback entries
- ✅ **Mark as Reviewed** - Toggle review status to track which feedback has been addressed

### Additional Features
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🔒 **Input Validation** - Client-side and server-side validation for data integrity
- 🎨 **Modern UI** - Gradient design with smooth animations and hover effects
- ⚡ **Real-time Updates** - Instant feedback list refresh after actions
- 🛡️ **Security** - XSS protection, input sanitization, and rate limiting

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Validator** - Data validation library

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with Flexbox/Grid
- **JavaScript (ES6+)** - Interactivity and API calls

### Development & Deployment
- **Git** - Version control
- **GitHub** - Code repository
- **Vercel** - Hosting platform
- **MongoDB Atlas** - Cloud database

## 📁 Project Structure

```
feedback-app/
├── backend/
│ ├── config/
│ │ └── db.js # Database configuration
│ ├── controllers/
│ │ └── feedbackController.js # Business logic (CRUD operations)
│ ├── middleware/
│ │ ├── errorMiddleware.js # Error handling middleware
│ │ └── validationMiddleware.js # Input validation middleware
│ ├── models/
│ │ └── Feedback.js # Feedback database schema
│ ├── routes/
│ │ └── feedbackRoutes.js # API route definitions
│ ├── utils/
│ │ └── validators.js # Validation helper functions
│ ├── .env # Environment variables (not committed)
│ ├── .gitignore # Git ignore rules
│ ├── package.json # NPM dependencies
│ └── server.js # Application entry point
├── frontend/
│ ├── index.html # Main HTML structure
│ ├── style.css # Styling and responsive design
│ └── script.js # Frontend logic and API calls
├── vercel.json # Vercel deployment configuration
└── README.md # Project documentation

```


### API Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| **POST** | `/feedback` | Create new feedback entry | `{ name, email, message }` | Created feedback object |
| **GET** | `/feedback` | Retrieve all feedback entries | - | Array of feedback objects |
| **GET** | `/feedback/:id` | Retrieve single feedback by ID | - | Single feedback object |
| **PUT** | `/feedback/:id` | Toggle review status | - | Updated feedback object |
| **DELETE** | `/feedback/:id` | Delete feedback entry | - | Success message |


### Request Examples

#### POST /feedback - Create New Feedback

```javascript
fetch('http://localhost:5000/api/feedback', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: 'John Doe',
        email: 'john.doe@example.com',
        message: 'This feedback management system is fantastic! Really helpful for our team.'
    })
})
```


## 🙏 Acknowledgments

### Built With ❤️ by Sakshi

This Feedback Management System was meticulously crafted and developed by **Sakshi** as part of the internship assignment for **UTSANOVA**.

