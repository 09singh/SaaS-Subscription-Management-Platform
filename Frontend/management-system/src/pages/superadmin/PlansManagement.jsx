import { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import Button from '../../components/Button';
import Input from '../../components/Input';

export default function PlansManagement() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    features: '',
    description: '',
  });

  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminService.getPlans();
      setPlans(Array.isArray(data) ? data : data.plans || []);
    } catch (err) {
      setError(err.message || 'Failed to load plans');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchPlans();
    };
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price) {
      setError('Name and price are required');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        features: formData.features.split(',').map(f => f.trim()).filter(f => f),
      };

      if (editingId) {
        await adminService.updatePlan(editingId, payload);
      } else {
        await adminService.createPlan(payload);
      }

      fetchPlans();
      setFormData({ name: '', price: '', features: '', description: '' });
      setShowForm(false);
      setEditingId(null);
    } catch (err) {
      setError(err.message || 'Failed to save plan');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (plan) => {
    setFormData({
      name: plan.name,
      price: plan.price,
      features: plan.features?.join(', ') || '',
      description: plan.description || '',
    });
    setEditingId(plan._id);
    setShowForm(true);
  };

  const handleDelete = async (planId) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        await adminService.deletePlan(planId);
        setPlans(plans.filter(p => p._id !== planId));
      } catch (err) {
        setError(err.message || 'Failed to delete plan');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Plans Management</h1>
        <Button
          onClick={() => {
            setEditingId(null);
            setFormData({ name: '', price: '', features: '', description: '' });
            setShowForm(!showForm);
          }}
          variant="primary"
        >
          {showForm ? 'Cancel' : '+ New Plan'}
        </Button>
      </div>

      {error && <ErrorMessage message={error} onRetry={() => setError(null)} />}

      {showForm && (
        <form onSubmit={handleSubmit} className="p-6 mb-6 space-y-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingId ? 'Edit Plan' : 'Create New Plan'}
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Plan Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Price ($/month)"
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="2"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Features (comma-separated)
            </label>
            <textarea
              name="features"
              value={formData.features}
              onChange={handleChange}
              rows="3"
              placeholder="Feature 1, Feature 2, Feature 3..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={submitting} variant="primary">
              {submitting ? 'Saving...' : (editingId ? 'Update Plan' : 'Create Plan')}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {plans.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-lg shadow col-span-full">
            <p className="text-lg text-gray-500">No plans created yet</p>
          </div>
        ) : (
          plans.map((plan) => (
            <div key={plan._id} className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              <p className="mt-2 text-3xl font-bold text-blue-600">${plan.price}/mo</p>
              <p className="mt-2 text-sm text-gray-600">{plan.description}</p>

              <ul className="mt-4 space-y-2">
                {plan.features?.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-green-600">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex gap-2 mt-6">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(plan)}
                  className="flex-1"
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(plan._id)}
                  className="flex-1"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
