import { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminService.getDashboardStats();
      setStats(data);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchStats();
    };
    loadData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {error && <ErrorMessage message={error} onRetry={fetchStats} />}

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Total Companies</p>
            <p className="text-4xl font-bold text-blue-600 mt-2">{stats.totalCompanies || 0}</p>
            <p className="text-gray-500 text-sm mt-2">Active: {stats.activeCompanies || 0}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Total Users</p>
            <p className="text-4xl font-bold text-green-600 mt-2">{stats.totalUsers || 0}</p>
            <p className="text-gray-500 text-sm mt-2">This Month: {stats.usersThisMonth || 0}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Monthly Revenue</p>
            <p className="text-4xl font-bold text-purple-600 mt-2">
              ${stats.monthlyRevenue || 0}
            </p>
            <p className="text-gray-500 text-sm mt-2">MRR</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Subscription Rate</p>
            <p className="text-4xl font-bold text-orange-600 mt-2">{stats.subscriptionRate || '0'}%</p>
            <p className="text-gray-500 text-sm mt-2">Conversion</p>
          </div>
        </div>
      )}

      {stats?.recentActivity && (
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {stats.recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div>
                  <p className="text-gray-900 font-medium">{activity.title}</p>
                  <p className="text-gray-500 text-sm">{activity.description}</p>
                </div>
                <p className="text-gray-500 text-sm">{activity.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
