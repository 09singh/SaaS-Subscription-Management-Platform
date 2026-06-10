import { Outlet } from 'react-router-dom';
import EmployeeSidebar from '../components/sidebars/EmployeeSidebar';

export default function EmployeeLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <EmployeeSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
