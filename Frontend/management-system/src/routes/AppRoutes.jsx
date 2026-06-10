import { Routes, Route } from 'react-router-dom';
import EmployeeLayout from '../layouts/EmployeeLayout';
import CompanyAdminLayout from '../layouts/CompanyAdminLayout';
import SuperAdminLayout from '../layouts/SuperAdminLayout';
import Home from '../pages/Home';
import Login from '../Features/auth/page/loginPage';
import Register from '../Features/auth/page/Register';
// Employee Pages
import EmployeeProfile from '../pages/employee/Profile';

// Company Admin Pages
import CompanyForm from '../pages/company/CompanyForm';


// Super Admin Pages

import AdminCompanies from '../pages/superadmin/Companies';
import AdminPlansManagement from '../pages/superadmin/PlansManagement';
// import AdminRevenue from '../pages/superadmin/Revenue';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Home Page - Landing Page */}
      <Route path="/" element={<Home />} />
      
      {/* Authentication Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Employee Routes with Sidebar */}
      <Route path="/employee" element={<EmployeeLayout />}>
        <Route path="profile" element={<EmployeeProfile />} />
      </Route>

      {/* Company Admin Routes with Sidebar */}
      <Route path="/company" element={<CompanyAdminLayout />}>
        <Route path="form" element={<CompanyForm />} />
      </Route>

      {/* Super Admin Routes with Sidebar */}
      <Route path="/superadmin" element={<SuperAdminLayout />}>
        <Route path="companies" element={<AdminCompanies />} />
        <Route path="plans" element={<AdminPlansManagement />} />
        {/* <Route path="revenue" element={<AdminRevenue />} /> */}
      </Route>
    </Routes>
  );
}
