import { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import Button from '../../components/Button';

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actioning, setActioning] = useState(null);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminService.getCompanies();
      setCompanies(Array.isArray(data) ? data : data.companies || []);
    } catch (err) {
      setError(err.message || 'Failed to load companies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchCompanies();
    };
    loadData();
  }, []);

  const handleSuspend = async (companyId) => {
    if (window.confirm('Are you sure you want to suspend this company?')) {
      try {
        setActioning(companyId);
        await adminService.suspendCompany(companyId);
        setCompanies(companies.map(c =>
          c.id === companyId ? { ...c, status: 'suspended' } : c
        ));
      } catch (err) {
        setError(err.message || 'Failed to suspend company');
      } finally {
        setActioning(null);
      }
    }
  };

  const handleUnsuspend = async (companyId) => {
    try {
      setActioning(companyId);
      await adminService.unsuspendCompany(companyId);
      setCompanies(companies.map(c =>
        c.id === companyId ? { ...c, status: 'active' } : c
      ));
    } catch (err) {
      setError(err.message || 'Failed to unsuspend company');
    } finally {
      setActioning(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Companies</h1>

      {error && <ErrorMessage message={error} onRetry={fetchCompanies} />}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {companies.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 text-lg">No companies registered</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Company</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Employees</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Plan</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">{company.name}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{company.email}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{company.employeeCount || 0}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{company.plan || 'Free'}</td>
                  <td className="px-6 py-3 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      company.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {company.status === 'active' ? 'Active' : 'Suspended'}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm space-x-2">
                    {company.status === 'active' ? (
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleSuspend(company.id)}
                        disabled={actioning === company.id}
                      >
                        {actioning === company.id ? '...' : 'Suspend'}
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => handleUnsuspend(company.id)}
                        disabled={actioning === company.id}
                      >
                        {actioning === company.id ? '...' : 'Activate'}
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
