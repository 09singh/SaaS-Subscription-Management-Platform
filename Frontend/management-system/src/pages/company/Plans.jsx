import { useEffect, useState } from 'react';
import companyService from '../../services/companyService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import Button from '../../components/Button';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [upgrading, setUpgrading] = useState(null);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await companyService.getPlans();
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

  const handleUpgrade = async (planId) => {
    try {
      setUpgrading(planId);
      await companyService.upgradePlan(planId);
      fetchPlans();
    } catch (err) {
      setError(err.message || 'Failed to upgrade plan');
    } finally {
      setUpgrading(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Subscription Plans</h1>

      {error && <ErrorMessage message={error} onRetry={fetchPlans} />}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {plans.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-lg shadow col-span-full">
            <p className="text-lg text-gray-500">No plans available</p>
          </div>
        ) : (
          plans.map((plan) => (
            <div key={plan._id} className={`rounded-lg shadow-md overflow-hidden ${
              plan.current ? 'border-2 border-blue-600' : 'border border-gray-200'
            }`}>
              <div className="p-6 bg-gray-50">
                <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
                <p className="mt-2 text-4xl font-bold text-blue-600">
                  ${plan.price}
                  <span className="text-lg text-gray-600">/month</span>
                </p>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <p className="mb-3 text-sm text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-2">
                  {plan.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-600">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="pt-4">
                  {plan.current ? (
                    <div className="px-4 py-2 font-medium text-center text-blue-600 border border-blue-200 rounded bg-blue-50">
                      Current Plan
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleUpgrade(plan._id)}
                      disabled={upgrading === plan._id}
                      variant="primary"
                      className="w-full"
                    >
                      {upgrading === plan._id ? 'Upgrading...' : 'Upgrade'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
