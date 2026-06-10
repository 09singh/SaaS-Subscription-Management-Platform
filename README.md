# 🚀 SaaS Subscription Management Platform

A full-stack SaaS-based Subscription Management System built using the MERN stack. This platform helps manage companies, employees, subscriptions, and roles with a scalable and modular architecture.

---

## 📌 Features

- 🔐 JWT Authentication & Authorization
- 🔒 Protected Route
- 👨‍💼 Role-based access control (Admin / Company Admin / Employee)  
- 🏢 Company management system  
- 📦 Subscription plans management   
- 📊 Admin dashboard for monitoring system activity  
- 🔄 Full CRUD operations for all major modules  
- 📱 Responsive UI (React + Tailwind CSS)  
- ⚡ RESTful API integration between frontend and backend  

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- React Router DOM
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- Bcrypt.js

---

## 📁 Project Structure
```
SaaS-Subscription-Management-Platform/
│
├── Back_end/
│ └── backend/
│ ├── routes/
│ ├── middleware/
│ ├── schema/
│ ├── controller/
│ └── server.js
│
├── Frontend/
│ └── management-system/
│ ├── src/
│ │── components/
│ ├── sidebar/
│ ├── Button.jsx
│ ├── ErrorMessage.jsx
│ ├── Input.jsx
│ ├── LoadingSpinner.jsx
│ └── ProtectedRoute.jsx
│
├── features/
│ └── auth/
│ ├── LoginPage.jsx
│ └── Register.jsx
│
├── layouts/
│ ├── CompanyAdminLayout.jsx
│ ├── EmployeeLayout.jsx
│ └── SuperAdminLayout.jsx
│
├── pages/
│ ├── company/
│ ├── employee/
│ └── superAdmin/
│
├── routes/
│ └── AppRoute.jsx
│
└── services/
├── api.js
├── adminServices.js
├── authServices.js
├── companyServices.js
└── employeeServices.js
│ │ └── App.jsx
│ └── vite.config.js
```
screenshorts/Register.png
## 📸 Screenshots

### Login Page
![Login Page](./screenshorts/login.png)

### Dashboard
![Register](./screenshorts/Register.png)

### Employee Panel
![Subscription-Plane](./screenshorts/planes.png)


## 📈 Scalability & Extensibility

This SaaS Subscription Management Platform is designed with a modular and scalable architecture. The codebase follows a clear separation of concerns between frontend and backend, making it easy to maintain and extend.

- 🧩 **Modular Structure:** Features are divided into independent modules (auth, users, companies, subscriptions), so new features can be added without affecting existing logic.
- 🔌 **API-driven backend:** RESTful APIs ensure smooth communication between frontend and backend, making it easy to integrate new services or microservices later.
- 🏗️ **Component-based frontend:** React components are reusable and scalable, allowing new UI features to be added quickly.
- 🗄️ **Database flexibility:** MongoDB schema design supports easy extension of fields and collections without breaking existing data flow.
- ⚡ **Future-ready:** New features like payments, analytics, notifications, or AI tools can be integrated with minimal changes to core structure.

Overall, the project is built to support long-term growth, easy feature expansion, and clean maintainability.
