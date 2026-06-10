import { Outlet } from 'react-router-dom';
import CompanySidebar from '../components/sidebars/CompanySidebar';

export default function CompanyAdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <CompanySidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
