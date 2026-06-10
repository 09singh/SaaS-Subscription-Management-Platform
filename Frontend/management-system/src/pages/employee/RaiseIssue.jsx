// import { useState } from 'react';
// import employeeService from '../../services/employeeService';
// import ErrorMessage from '../../components/ErrorMessage';
// import Button from '../../components/Button';
// import Input from '../../components/Input';

// export default function RaiseIssue() {
//   const [formData, setFormData] = useState({
//     title: '',
//     category: 'technical',
//     description: '',
//     priority: 'medium',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (!formData.title.trim()) {
//       setError('Title is required');
//       return;
//     }
//     if (!formData.description.trim()) {
//       setError('Description is required');
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
//       await employeeService.raiseIssue(formData);
//       setSuccess(true);
//       setFormData({
//         title: '',
//         category: 'technical',
//         description: '',
//         priority: 'medium',
//       });
//       setTimeout(() => setSuccess(false), 5000);
//     } catch (err) {
//       setError(err.message || 'Failed to raise issue');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl">
//       <h1 className="mb-6 text-3xl font-bold text-gray-900">Raise an Issue</h1>

//       {error && <ErrorMessage message={error} onRetry={() => setError(null)} />}

//       {success && (
//         <div className="p-4 mb-6 border border-green-200 rounded-lg bg-green-50">
//           <p className="font-medium text-green-800">Issue raised successfully! Our team will review it soon.</p>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white rounded-lg shadow-md">
//         <Input
//           label="Issue Title"
//           name="title"
//           type="text"
//           value={formData.title}
//           onChange={handleChange}
//           placeholder="Brief title of the issue"
//           required
//         />

//         <div>
//           <label className="block mb-1 text-sm font-medium text-gray-700">Category</label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="technical">Technical</option>
//             <option value="billing">Billing</option>
//             <option value="account">Account</option>
//             <option value="other">Other</option>
//           </select>
//         </div>

//         <div>
//           <label className="block mb-1 text-sm font-medium text-gray-700">Priority</label>
//           <select
//             name="priority"
//             value={formData.priority}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//             <option value="urgent">Urgent</option>
//           </select>
//         </div>

//         <div>
//           <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Detailed description of the issue..."
//             rows="6"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div className="flex gap-3">
//           <Button type="submit" disabled={loading} variant="primary">
//             {loading ? 'Submitting...' : 'Submit Issue'}
//           </Button>
//           <Button type="button" variant="secondary" onClick={() => setFormData({ title: '', category: 'technical', description: '', priority: 'medium' })}>
//             Clear
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }
