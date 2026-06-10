# Quick Start Guide - SaaS Dashboard Frontend

## 🚀 Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File
```bash
cp .env.example .env.local
```

Configure `.env.local`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm run dev
```

The application will start at `http://localhost:5173`

## 📖 Usage

### Access by Role

Once your backend is running and users are authenticated:

**Employee Dashboard:**
- URL: `/employee/profile`
- Features: Profile, Tasks, Documents, Issue Tracking

**Company Admin Dashboard:**
- URL: `/company/form`
- Features: Company Management, Plans, Usage, Employee Management

**Super Admin Dashboard:**
- URL: `/superadmin/dashboard`
- Features: Analytics, Company Management, Plans, Revenue

### Default Navigation

Routes are automatically available based on the JWT token's user role stored in localStorage.

## 🔑 Key Implementation Notes

### Authentication Flow
1. User logs in via backend
2. Backend returns JWT token
3. Token stored in `localStorage` as `token`
4. User data stored in `localStorage` as `user` (JSON)
5. Token auto-attached to all requests via interceptor
6. 401 errors trigger redirect to login

### Service Layer Pattern
All data flows through dedicated service files:
- `authService.js` - Authentication
- `employeeService.js` - Employee operations
- `companyService.js` - Company admin operations
- `adminService.js` - Super admin operations

**Example:**
```jsx
// ✅ Correct way
import employeeService from '../../services/employeeService';
const tasks = await employeeService.getTasks();

// ❌ Never do this
const tasks = await api.get('/employee/tasks');
```

## 🎯 Common Tasks

### Add a New Employee Page

1. **Create page** at `src/pages/employee/NewPage.jsx`
2. **Add route** in `src/routes/AppRoutes.jsx`:
   ```jsx
   <Route path="new-page" element={<NewPage />} />
   ```
3. **Update sidebar** in `src/components/sidebars/EmployeeSidebar.jsx`
4. **Add service methods** in `src/services/employeeService.js` (if needed)

### Making API Calls

```jsx
import { useEffect, useState } from 'react';
import employeeService from '../../services/employeeService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

export default function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await employeeService.getTasks();
      setData(result);
    } catch (err) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchData();
    };
    loadData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      {error && <ErrorMessage message={error} onRetry={fetchData} />}
      {data && /* render data */}
    </div>
  );
}
```

## 📚 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🛠️ Troubleshooting

### 401 Unauthorized Errors
- Verify backend is running on `http://localhost:5000`
- Check JWT token in localStorage
- Ensure token is valid (not expired)

### CORS Errors
- Backend should allow requests from `http://localhost:5173`
- Configure CORS headers on backend

### Components Not Showing
- Ensure route is added in `AppRoutes.jsx`
- Check sidebar navigation links are correct
- Verify component is exported as default

## 📦 Production Build

```bash
# Build
npm run build

# Deploy 'dist' folder to your hosting
```

Set environment variables on your hosting:
```env
VITE_API_URL=https://api.yourbackend.com
```

## 🤝 Support

For API integration help, see [API_INTEGRATION_GUIDE.md](API_INTEGRATION_GUIDE.md)
For architecture details, see [FRONTEND_README.md](FRONTEND_README.md)

---

**Ready to build?** Start the dev server with `npm run dev`!
