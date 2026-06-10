import { Outlet } from 'react-router-dom';
import SuperAdminSidebar from '../components/sidebars/SuperAdminSidebar';

export default function SuperAdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <SuperAdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
