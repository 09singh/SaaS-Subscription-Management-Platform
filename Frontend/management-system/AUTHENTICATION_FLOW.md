# 🔐 Authentication & Routing Flow

## Complete User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                     Application Launch                          │
│                         (Home Page)                             │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                ┌──────────┴──────────┐
                │                     │
                ▼                     ▼
         [Login Button]       [Register Button]
                │                     │
                ▼                     ▼
         /login Page          /register Page
             │                        │
             │                        │
             ├─ Enter email  ├─ Enter name
             ├─ Enter pass   ├─ Enter email
             │               ├─ Enter password
             │               ├─ Confirm password
             │               ├─ Select role (dropdown)
             │               │
             │               ▼
             │        [Register Button]
             │               │
             │               ├─ Validate inputs
             │               ├─ Call registerUser()
             │               ├─ Show success message
             │               └─► Redirect to /login
             │
             ▼
        [Login Button]
             │
             ├─ Validate inputs
             ├─ Call loginUser()
             ├─ Get user data with role
             │
             └─► Route Based on Role:
                 │
                 ├─ admin → /superadmin/dashboard
                 │          (SuperAdmin Dashboard with Sidebar)
                 │
                 ├─ employee → /employee/profile
                 │             (Employee Dashboard with Sidebar)
                 │
                 └─ company → /company/form
                              (Company Admin Dashboard with Sidebar)
```

## Route Structure

### Public Routes (No Authentication Required)
```
/                  → Home Page (Landing Page)
/login            → Login Page
/register         → Registration Page
```

### Protected Routes (Authentication Required)

#### Employee Dashboard
```
/employee         → Employee Layout (with Sidebar)
├─ /profile       → Profile Page
├─ /tasks         → Task Management
├─ /documents     → Document Upload/Management
└─ /raise-issue   → Issue Reporting System
```

#### Company Admin Dashboard
```
/company          → Company Admin Layout (with Sidebar)
├─ /form          → Company Details Form
├─ /plans         → Subscription Plans & Upgrade
├─ /usage         → Usage Statistics
└─ /employees     → Employee Management
```

#### Super Admin Dashboard
```
/superadmin       → Super Admin Layout (with Sidebar)
├─ /dashboard     → System Analytics
├─ /companies     → Company Management & Suspension
├─ /plans         → Plan CRUD Operations
└─ /revenue       → Revenue Analytics
```

## Key Components

### Home Page (`src/pages/Home.jsx`)
- Landing page shown on app launch
- Navigation buttons to Login/Register
- "Get Started" button → `/register`
- Features section
- Responsive design

### Login Page (`src/Features/auth/page/loginPage.jsx`)
- Email & password input
- Role-based redirect after login:
  - `admin` role → `/superadmin/dashboard`
  - `employee` role → `/employee/profile`
  - `company` role → `/company/form`
- Link to register page if user doesn't have account

### Register Page (`src/Features/auth/page/Register.jsx`)
- Full name, email, password, confirm password
- Role selection dropdown:
  - Super Admin
  - Employee
  - Company Admin
- Input validation
- Redirects to `/login` after successful registration
- Link to login page for existing users

### Layouts with Sidebars
Each role-based layout includes:
1. **EmployeeLayout** - Employee sidebar with navigation
2. **CompanyAdminLayout** - Company admin sidebar
3. **SuperAdminLayout** - Super admin sidebar

All sidebars include:
- Navigation links to role-specific pages
- Active link highlighting
- Logout button

## Authentication Flow Details

### Login Process
```javascript
1. User enters email & password
2. Submit form → loginUser(formData)
3. Backend validates credentials
4. Backend returns: { token, user, role }
5. Token stored in localStorage
6. Redirect to role-based dashboard
```

### Register Process
```javascript
1. User enters full name, email, password, role
2. Submit form → registerUser(formData)
3. Backend creates new user account
4. Show success message
5. Redirect to /login page
6. User can now login with credentials
```

### After Login
```javascript
1. Token auto-attached to all API requests (via interceptor)
2. User can access role-specific dashboard
3. Sidebar provides navigation to all role features
4. Logout button clears token and redirects to home
```

## File Updates Made

### Updated Files:
1. **src/routes/AppRoutes.jsx**
   - Added `/login` and `/register` routes
   - Imports Login and Register components

2. **src/Features/auth/page/loginPage.jsx**
   - Fixed role-based redirects to correct paths:
     - `admin` → `/superadmin/dashboard`
     - `employee` → `/employee/profile`
     - `company` → `/company/form`
   - Added "Register here" link at bottom

3. **src/Features/auth/page/Register.jsx**
   - Added `useNavigate` import
   - Redirect to `/login` after successful registration
   - Added "Login here" link at bottom

4. **src/pages/Home.jsx**
   - Updated "Get Started" button to navigate to `/register`
   - Added hover effects for better UX

5. **src/App.jsx**
   - Removed unused `Navigate` import

## Testing the Flow

### Test Sequence:
1. **Start app**: Should see Home page
2. **Click "Get Started"**: Should go to Register page
3. **Register new user**: 
   - Fill form with test data
   - Select role from dropdown
   - Click Register → Redirect to Login page
4. **Login**:
   - Use registered email & password
   - Should redirect to role-specific dashboard
   - Should see sidebar navigation
5. **Navigation**:
   - Click sidebar links to navigate between pages
   - Each page should load with data from services
6. **Logout**: Should return to Home page

## Security Notes

✅ **Implemented:**
- JWT tokens stored in localStorage
- Tokens auto-attached via Axios interceptor
- 401 errors trigger redirect to login
- Password confirmation on registration
- Email validation on login

⚠️ **Additional Security (Optional):**
- Add token refresh mechanism
- Implement CSRF protection
- Add rate limiting on auth endpoints
- Add email verification
- Add forgot password functionality

## Environment Configuration

Make sure `.env.local` has:
```env
VITE_API_URL=http://localhost:5000/api
```

Backend should have these endpoints:
- `POST /auth/login` - Authenticate user
- `POST /auth/register` - Create new account
- `GET /auth/me` - Get current user info
- All role-specific service endpoints

---

**Your authentication flow is now complete! 🎉**

Users will:
1. See Home page on app load
2. Register or Login
3. Get routed to their role-based dashboard
4. Access sidebar navigation and services
