import { Link, useLocation } from 'react-router-dom';

export default function CompanySidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { label: 'Company Details', path: '/company/form', icon: '🏢' },
    // { label: 'Plans', path: '/company/plans', icon: '📋' },
    // { label: 'Usage', path: '/company/usage', icon: '📊' },
    // { label: 'Employees', path: '/company/employees', icon: '👥' },
  ];

  return (
    <aside className="w-64 min-h-screen p-6 text-white bg-gray-900">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Company Admin</h1>
        <p className="mt-1 text-sm text-gray-400">Dashboard</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-purple-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="pt-6 mt-8 border-t border-gray-700">
        <button
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
          }}
          className="w-full px-4 py-3 text-left text-gray-300 transition-colors rounded-lg hover:bg-gray-800"
        >
          <span className="text-lg">🚪</span> Logout
        </button>
      </div>
    </aside>
  );
}
