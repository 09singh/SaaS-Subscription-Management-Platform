import { useEffect, useState } from 'react';
import companyService from '../../services/companyService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import Button from '../../components/Button';
import Input from '../../components/Input';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    department: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await companyService.getEmployees();
      setEmployees(Array.isArray(data) ? data : data.employees || []);
    } catch (err) {
      setError(err.message || 'Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchEmployees();
    };
    loadData();
  }, []);

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    
    if (!formData.email.trim() || !formData.name.trim()) {
      setError('Email and name are required');
      return;
    }

    try {
      setSubmitting(true);
      await companyService.addEmployee(formData);
      fetchEmployees();
      setFormData({ email: '', name: '', department: '' });
      setShowForm(false);
    } catch (err) {
      setError(err.message || 'Failed to add employee');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemoveEmployee = async (employeeId) => {
    if (window.confirm('Are you sure you want to remove this employee?')) {
      try {
        await companyService.removeEmployee(employeeId);
        setEmployees(employees.filter(emp => emp.id !== employeeId));
      } catch (err) {
        setError(err.message || 'Failed to remove employee');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
        <Button onClick={() => setShowForm(!showForm)} variant="primary">
          {showForm ? 'Cancel' : '+ Add Employee'}
        </Button>
      </div>

      {error && <ErrorMessage message={error} onRetry={() => setError(null)} />}

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Employee</h2>
          <form onSubmit={handleAddEmployee} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Input
                label="Department"
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
            </div>
            <div className="flex gap-3">
              <Button type="submit" disabled={submitting} variant="primary">
                {submitting ? 'Adding...' : 'Add Employee'}
              </Button>
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {employees.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 text-lg">No employees yet</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Department</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm text-gray-900 font-medium">{employee.name}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{employee.email}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{employee.department || '-'}</td>
                  <td className="px-6 py-3 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      employee.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {employee.status || 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <button
                      onClick={() => handleRemoveEmployee(employee.id)}
                      className="text-red-600 hover:text-red-900 font-medium"
                    >
                      Remove
                    </button>
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
