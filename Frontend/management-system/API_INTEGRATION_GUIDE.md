/**
 * API Integration Guide
 * 
 * This file provides guidelines for integrating new API endpoints
 */

/**
 * STEP 1: Define the service method
 * 
 * Location: src/services/[serviceName].js
 * 
 * Example:
 * ```
 * const myService = {
 *   getData: async () => {
 *     try {
 *       const response = await api.get('/endpoint');
 *       return response.data;
 *     } catch (error) {
 *       throw error.response?.data || error;
 *     }
 *   },
 * };
 * ```
 */

/**
 * STEP 2: Use the service in component
 * 
 * Example:
 * ```
 * import { useEffect, useState } from 'react';
 * import myService from '../../services/myService';
 * import LoadingSpinner from '../../components/LoadingSpinner';
 * import ErrorMessage from '../../components/ErrorMessage';
 * 
 * export default function MyComponent() {
 *   const [data, setData] = useState(null);
 *   const [loading, setLoading] = useState(true);
 *   const [error, setError] = useState(null);
 * 
 *   useEffect(() => {
 *     fetchData();
 *   }, []);
 * 
 *   const fetchData = async () => {
 *     try {
 *       setLoading(true);
 *       setError(null);
 *       const result = await myService.getData();
 *       setData(result);
 *     } catch (err) {
 *       setError(err.message || 'Failed to load data');
 *     } finally {
 *       setLoading(false);
 *     }
 *   };
 * 
 *   if (loading) return <LoadingSpinner />;
 * 
 *   return (
 *     <div>
 *       {error && <ErrorMessage message={error} onRetry={fetchData} />}
 *       {data && <div>{JSON.stringify(data)}</div>}
 *     </div>
 *   );
 * }
 * ```
 */

/**
 * STEP 3: Handle form submissions
 * 
 * Example:
 * ```
 * const [formData, setFormData] = useState({ name: '', email: '' });
 * const [submitting, setSubmitting] = useState(false);
 * 
 * const handleSubmit = async (e) => {
 *   e.preventDefault();
 *   
 *   // Validation
 *   if (!formData.name || !formData.email) {
 *     setError('All fields are required');
 *     return;
 *   }
 * 
 *   try {
 *     setSubmitting(true);
 *     setError(null);
 *     await myService.submitForm(formData);
 *     setSuccess(true);
 *     setFormData({ name: '', email: '' });
 *   } catch (err) {
 *     setError(err.message || 'Failed to submit');
 *   } finally {
 *     setSubmitting(false);
 *   }
 * };
 * ```
 */

/**
 * BEST PRACTICES
 * 
 * 1. ERROR HANDLING
 *    - Always catch and handle errors
 *    - Display user-friendly messages
 *    - Provide retry mechanisms
 * 
 * 2. LOADING STATES
 *    - Show loading spinner during fetch
 *    - Disable buttons during submission
 *    - Prevent duplicate requests
 * 
 * 3. SERVICE LAYER
 *    - Keep all API logic in services/
 *    - Never make direct axios calls in components
 *    - Reuse service methods across components
 * 
 * 4. DATA VALIDATION
 *    - Validate on frontend before sending
 *    - Handle validation errors from backend
 *    - Show specific error messages
 * 
 * 5. STATE MANAGEMENT
 *    - Use useState for local component state
 *    - Keep related state together
 *    - Reset state after successful operations
 * 
 * 6. AUTHENTICATION
 *    - JWT token auto-attached via interceptor
 *    - 401 auto-redirects to login
 *    - User data cached in localStorage
 * 
 * 7. PERFORMANCE
 *    - Use useEffect cleanup to prevent memory leaks
 *    - Debounce search/filter inputs
 *    - Implement pagination for large lists
 * 
 * 8. ACCESSIBILITY
 *    - Use semantic HTML
 *    - Add proper ARIA labels
 *    - Ensure keyboard navigation
 */

export default {
  // This file is for documentation only
};
