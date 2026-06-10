// import { useEffect, useState } from 'react';
// import adminService from '../../services/adminService';
// import LoadingSpinner from '../../components/LoadingSpinner';
// import ErrorMessage from '../../components/ErrorMessage';

// export default function Revenue() {
//   const [revenue, setRevenue] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchRevenue = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await adminService.getRevenue();
//       setRevenue(data);
//     } catch (err) {
//       setError(err.message || 'Failed to load revenue data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const loadData = async () => {
//       await fetchRevenue();
//     };
//     loadData();
//   }, []);

//   if (loading) return <LoadingSpinner />;

//   return (
//     <div>
//       <h1 className="mb-6 text-3xl font-bold text-gray-900">Revenue Analytics</h1>

//       {error && <ErrorMessage message={error} onRetry={fetchRevenue} />}

//       {revenue && (
//         <>
//           <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
//             <div className="p-6 bg-white rounded-lg shadow">
//               <p className="text-sm font-medium text-gray-600">Total Revenue</p>
//               <p className="mt-2 text-3xl font-bold text-green-600">
//                 ${revenue.totalRevenue?.toLocaleString() || 0}
//               </p>
//             </div>

//             <div className="p-6 bg-white rounded-lg shadow">
//               <p className="text-sm font-medium text-gray-600">Monthly Recurring</p>
//               <p className="mt-2 text-3xl font-bold text-blue-600">
//                 ${revenue.mrr?.toLocaleString() || 0}
//               </p>
//             </div>

//             <div className="p-6 bg-white rounded-lg shadow">
//               <p className="text-sm font-medium text-gray-600">This Month</p>
//               <p className="mt-2 text-3xl font-bold text-purple-600">
//                 ${revenue.thisMonth?.toLocaleString() || 0}
//               </p>
//             </div>

//             <div className="p-6 bg-white rounded-lg shadow">
//               <p className="text-sm font-medium text-gray-600">Avg per Company</p>
//               <p className="mt-2 text-3xl font-bold text-orange-600">
//                 ${revenue.avgPerCompany?.toLocaleString() || 0}
//               </p>
//             </div>
//           </div>

//           {revenue.byPlan && (
//             <div className="p-6 mb-8 bg-white rounded-lg shadow">
//               <h2 className="mb-4 text-xl font-semibold text-gray-900">Revenue by Plan</h2>
//               <div className="space-y-3">
//                 {Object.entries(revenue.byPlan).map(([plan, amount]) => (
//                   <div key={plan} className="flex items-center justify-between">
//                     <div className="flex-1">
//                       <p className="font-medium text-gray-900 capitalize">{plan}</p>
//                     </div>
//                     <p className="text-lg font-bold text-gray-900">
//                       ${amount.toLocaleString()}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {revenue.recentTransactions && (
//             <div className="p-6 bg-white rounded-lg shadow">
//               <h2 className="mb-4 text-xl font-semibold text-gray-900">Recent Transactions</h2>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-4 py-2 text-sm font-semibold text-left text-gray-900">Company</th>
//                       <th className="px-4 py-2 text-sm font-semibold text-left text-gray-900">Amount</th>
//                       <th className="px-4 py-2 text-sm font-semibold text-left text-gray-900">Plan</th>
//                       <th className="px-4 py-2 text-sm font-semibold text-left text-gray-900">Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {revenue.recentTransactions.map((tx, idx) => (
//                       <tr key={idx} className="border-t">
//                         <td className="px-4 py-3 text-sm text-gray-900">{tx.company}</td>
//                         <td className="px-4 py-3 text-sm font-bold text-green-600">
//                           ${tx.amount}
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-600">{tx.plan}</td>
//                         <td className="px-4 py-3 text-sm text-gray-600">
//                           {new Date(tx.date).toLocaleDateString()}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }
