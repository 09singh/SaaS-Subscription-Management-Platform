# SaaS Subscription Management Platform - Frontend

A production-ready React (Vite) frontend for a role-based SaaS dashboard with Tailwind CSS styling and Axios for API communication.

## 🏗️ Architecture Overview

### Role-Based Access

The application supports three distinct roles with separate dashboards, layouts, and navigation:

1. **Employee** - Access to personal tasks, documents, and issue tracking
2. **Company Admin** - Company management, employee management, and usage tracking
3. **Super Admin** - System-wide administration, revenue tracking, and plan management

## 📁 Project Structure

```
src/
├── components/
│   ├── Button.jsx               # Reusable button component
│   ├── ErrorMessage.jsx         # Error display component
│   ├── Input.jsx                # Reusable input component
│   ├── LoadingSpinner.jsx       # Loading state indicator
│   ├── ProtectedRoute.jsx       # Route protection wrapper
│   └── sidebars/
│       ├── EmployeeSidebar.jsx
│       ├── CompanySidebar.jsx
│       └── SuperAdminSidebar.jsx
│
├── layouts/
│   ├── EmployeeLayout.jsx       # Employee dashboard layout
│   ├── CompanyAdminLayout.jsx   # Company admin layout
│   └── SuperAdminLayout.jsx     # Super admin layout
│
├── pages/
│   ├── employee/
│   │   ├── Profile.jsx          # Employee profile view
│   │   ├── Tasks.jsx            # Task management
│   │   ├── Documents.jsx        # Document upload/management
│   │   └── RaiseIssue.jsx       # Issue reporting
│   │
│   ├── company/
│   │   ├── CompanyForm.jsx      # Company details form
│   │   ├── Plans.jsx            # Subscription plan selection
│   │   ├── Usage.jsx            # Usage statistics
│   │   └── Employees.jsx        # Employee management
│   │
│   └── superadmin/
│       ├── Dashboard.jsx        # Admin dashboard with stats
│       ├── Companies.jsx        # Company management
│       ├── PlansManagement.jsx  # Plan CRUD operations
│       └── Revenue.jsx          # Revenue analytics
│
├── routes/
│   └── AppRoutes.jsx            # Nested route configuration
│
├── services/
│   ├── api.js                   # Axios instance with interceptors
│   ├── authService.js           # Authentication operations
│   ├── employeeService.js       # Employee API calls
│   ├── companyService.js        # Company admin API calls
│   └── adminService.js          # Super admin API calls
│
├── App.jsx                      # Main app component with Router
├── App.css                      # Global app styles
├── main.jsx                     # Application entry point
└── index.css                    # Global styles with Tailwind
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Backend API running on `http://localhost:5000/api` (configurable)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🔐 API Integration

### Axios Configuration

The API layer is centralized in `src/services/api.js` with:

- **Base URL** from environment variables
- **Request Interceptor** - Automatically attaches JWT token
- **Response Interceptor** - Handles 401/403 errors globally

### Service Layer Pattern

All API calls go through dedicated service files. **No direct Axios calls in components.**

Example:
```jsx
// ✅ Correct
import employeeService from '../../services/employeeService';

const tasks = await employeeService.getTasks();

// ❌ Wrong
const tasks = await api.get('/employee/tasks');
```

## 📦 Service Layer Reference

### authService.js
```javascript
authService.login(email, password)
authService.register(userData)
authService.getCurrentUser()
authService.logout()
```

### employeeService.js
```javascript
employeeService.getProfile()
employeeService.getTasks()
employeeService.updateTaskStatus(taskId, status)
employeeService.uploadDocument(formData)
employeeService.deleteDocument(id)
employeeService.raiseIssue(payload)
```

### companyService.js
```javascript
companyService.submitCompanyForm(data)
companyService.getPlans()
companyService.upgradePlan(planId)
companyService.getUsage()
companyService.getEmployees()
companyService.addEmployee(employeeData)
companyService.removeEmployee(employeeId)
```

### adminService.js
```javascript
adminService.getDashboardStats()
adminService.getCompanies()
adminService.suspendCompany(companyId)
adminService.unsuspendCompany(companyId)
adminService.getPlans()
adminService.createPlan(planData)
adminService.updatePlan(planId, planData)
adminService.deletePlan(planId)
adminService.getRevenue()
```

## 🛣️ Routing Structure

Routes are organized by role with nested structure:

### Employee Routes
- `/employee/profile` - User profile
- `/employee/tasks` - Task management
- `/employee/documents` - Document management
- `/employee/raise-issue` - Report issues

### Company Admin Routes
- `/company/form` - Company details
- `/company/plans` - Subscription plans
- `/company/usage` - Usage statistics
- `/company/employees` - Employee management

### Super Admin Routes
- `/superadmin/dashboard` - System dashboard
- `/superadmin/companies` - Company management
- `/superadmin/plans` - Plan management
- `/superadmin/revenue` - Revenue analytics

## 🎨 UI Components

### Reusable Components

**Button**
```jsx
<Button variant="primary" size="md" disabled={false}>
  Click Me
</Button>
```

Variants: `primary`, `secondary`, `danger`, `success`, `outline`
Sizes: `sm`, `md`, `lg`

**Input**
```jsx
<Input
  label="Email"
  type="email"
  error="Invalid email"
  placeholder="Enter email"
/>
```

**LoadingSpinner**
```jsx
<LoadingSpinner />
```

**ErrorMessage**
```jsx
<ErrorMessage 
  message="Failed to load data"
  onRetry={() => fetchData()}
/>
```

## 🔑 Key Features

### ✅ Authentication Flow
- JWT token stored in localStorage
- Request interceptor attaches token automatically
- 401 response redirects to login
- User data cached in localStorage

### ✅ Protected Routes
- Use `ProtectedRoute` component for role-based access
- Validates JWT token and user role
- Redirects unauthorized access

### ✅ Error Handling
- Global response interceptor
- Component-level error states
- User-friendly error messages
- Retry mechanisms

### ✅ Loading States
- Spinner component for data fetching
- Button disabled during submission
- Loading props throughout

### ✅ Responsive Design
- Tailwind CSS responsive utilities
- Mobile-first approach
- Sidebar collapses on mobile (ready for enhancement)

## 🌐 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:5000/api` | Backend API base URL |

## 🛠️ Development Workflow

### Adding a New Feature

1. **Create the page component** in `src/pages/[role]/`
2. **Add service methods** in `src/services/`
3. **Add route** in `src/routes/AppRoutes.jsx`
4. **Update sidebar** navigation in appropriate `Sidebar.jsx`
5. **Style with Tailwind** using provided utilities

### Example: Add Employee Dashboard Page

**1. Create page** (`src/pages/employee/Dashboard.jsx`):
```jsx
import { useEffect, useState } from 'react';
import employeeService from '../../services/employeeService';

export default function Dashboard() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    employeeService.getProfile().then(setData);
  }, []);
  
  return <div>{/* content */}</div>;
}
```

**2. Add service method** (already exists in employeeService.js)

**3. Add route** in `src/routes/AppRoutes.jsx`:
```jsx
<Route path="dashboard" element={<EmployeeDashboard />} />
```

**4. Update sidebar** (`src/components/sidebars/EmployeeSidebar.jsx`):
```jsx
const menuItems = [
  // ... existing items
  { label: 'Dashboard', path: '/employee/dashboard', icon: '📊' },
];
```

## 📊 Tailwind CSS Utilities

The project uses Tailwind CSS with custom theme configuration:

```tailwindcss
/* Colors */
bg-blue-600, text-gray-900, border-red-200

/* Spacing */
px-4, py-3, gap-4, mb-6

/* Responsive */
md:grid-cols-2, lg:grid-cols-4

/* States */
hover:bg-blue-700, focus:ring-2, disabled:opacity-50
```

## 🔒 Security Practices

- ✅ JWT tokens stored securely in localStorage
- ✅ Tokens sent via Authorization header
- ✅ Automatic logout on 401
- ✅ No sensitive data in localStorage (except token)
- ✅ Protected routes validate authentication

## 🚀 Production Deployment

1. **Build:**
   ```bash
   npm run build
   ```

2. **Environment configuration:**
   - Set `VITE_API_URL` to production backend

3. **Serve:** Deploy `dist/` folder to static hosting

## 📝 Code Standards

- Functional components with hooks
- Service layer for all API calls
- Tailwind CSS for styling
- JSDoc comments for functions
- Consistent naming conventions

## 🤝 Contributing

1. Follow existing code patterns
2. Use service layer for API calls
3. Add error handling
4. Style with Tailwind
5. Test all role access paths

## 📄 License

MIT

---

**Note:** This is a frontend-only project. Backend API must be implemented separately.
