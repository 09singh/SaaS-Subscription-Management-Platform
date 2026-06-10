import { useEffect, useState } from 'react';
import companyService from '../../services/companyService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

export default function Usage() {
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsage = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await companyService.getUsage();
      setUsage(data);
    } catch (err) {
      setError(err.message || 'Failed to load usage data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchUsage();
    };
    loadData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Usage Statistics</h1>

      {error && <ErrorMessage message={error} onRetry={fetchUsage} />}

      {usage && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Total Users</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{usage.totalUsers || 0}</p>
            <p className="text-green-600 text-sm mt-2">Limit: {usage.userLimit || 'Unlimited'}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Storage Used</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{usage.storageUsed || '0'} GB</p>
            <p className="text-gray-600 text-sm mt-2">Limit: {usage.storageLimit || 'Unlimited'} GB</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">API Calls</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{usage.apiCalls || 0}</p>
            <p className="text-gray-600 text-sm mt-2">This Month</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Support Tickets</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{usage.supportTickets || 0}</p>
            <p className="text-gray-600 text-sm mt-2">Open: {usage.openTickets || 0}</p>
          </div>
        </div>
      )}

      {usage?.details && (
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Usage Details</h2>
          <div className="space-y-4">
            {Object.entries(usage.details).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600 capitalize">{key}</span>
                <span className="text-gray-900 font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
