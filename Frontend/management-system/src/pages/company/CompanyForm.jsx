import { useState } from 'react';
import companyService from '../../services/companyService';
import ErrorMessage from '../../components/ErrorMessage';
import Button from '../../components/Button';
import Input from '../../components/Input';

export default function CompanyForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    industry: '',
    website: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      await companyService.submitCompanyForm(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.message || 'Failed to submit company details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Company Details</h1>

      {error && <ErrorMessage message={error} onRetry={() => setError(null)} />}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 font-medium">Company details updated successfully!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Company Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
          />
          <Input
            label="Website"
            name="website"
            type="url"
            value={formData.website}
            onChange={handleChange}
          />
          <Input
            label="Industry"
            name="industry"
            type="text"
            value={formData.industry}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="2"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Input
            label="City"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
          />
          <Input
            label="State"
            name="state"
            type="text"
            value={formData.state}
            onChange={handleChange}
          />
          <Input
            label="Country"
            name="country"
            type="text"
            value={formData.country}
            onChange={handleChange}
          />
          <Input
            label="Zip Code"
            name="zipCode"
            type="text"
            value={formData.zipCode}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={loading} variant="primary">
            {loading ? 'Saving...' : 'Save Details'}
          </Button>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
