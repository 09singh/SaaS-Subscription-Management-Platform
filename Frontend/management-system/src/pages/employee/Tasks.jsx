// import { useEffect, useState } from 'react';
// import employeeService from '../../services/employeeService';
// import LoadingSpinner from '../../components/LoadingSpinner';
// import ErrorMessage from '../../components/ErrorMessage';
// import Button from '../../components/Button';

// export default function Tasks() {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [updating, setUpdating] = useState(null);

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await employeeService.getTasks();
//       setTasks(Array.isArray(data) ? data : data.tasks || []);
//     } catch (err) {
//       setError(err.message || 'Failed to load tasks');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const loadData = async () => {
//       await fetchTasks();
//     };
//     loadData();
//   }, []);

//   const handleStatusChange = async (taskId, newStatus) => {
//     try {
//       setUpdating(taskId);
//       await employeeService.updateTaskStatus(taskId, newStatus);
//       setTasks(tasks.map(task =>
//         task.id === taskId ? { ...task, status: newStatus } : task
//       ));
//     } catch (err) {
//       setError(err.message || 'Failed to update task');
//     } finally {
//       setUpdating(null);
//     }
//   };

//   if (loading) return <LoadingSpinner />;

//   const getStatusColor = (status) => {
//     const colors = {
//       pending: 'bg-yellow-100 text-yellow-800',
//       in_progress: 'bg-blue-100 text-blue-800',
//       completed: 'bg-green-100 text-green-800',
//       blocked: 'bg-red-100 text-red-800',
//     };
//     return colors[status] || 'bg-gray-100 text-gray-800';
//   };

//   const getStatusOptions = (currentStatus) => {
//     const allStatuses = ['pending', 'in_progress', 'completed', 'blocked'];
//     return allStatuses.filter(s => s !== currentStatus);
//   };

//   return (
//     <div>
//       <h1 className="mb-6 text-3xl font-bold text-gray-900">My Tasks</h1>

//       {error && <ErrorMessage message={error} onRetry={fetchTasks} />}

//       {tasks.length === 0 ? (
//         <div className="p-8 text-center bg-white rounded-lg shadow">
//           <p className="text-lg text-gray-500">No tasks assigned yet</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {tasks.map((task) => (
//             <div key={task.id} className="p-6 bg-white rounded-lg shadow-md">
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex-1">
//                   <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
//                   <p className="mt-1 text-gray-600">{task.description}</p>
//                 </div>
//                 <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
//                   {task.status?.replace('_', ' ').toUpperCase()}
//                 </span>
//               </div>

//               <div className="mb-4 text-sm text-gray-500">
//                 {task.dueDate && <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
//               </div>

//               <div className="flex gap-2">
//                 {getStatusOptions(task.status).map((status) => (
//                   <Button
//                     key={status}
//                     size="sm"
//                     variant="outline"
//                     onClick={() => handleStatusChange(task.id, status)}
//                     disabled={updating === task.id}
//                   >
//                     Mark {status.replace('_', ' ')}
//                   </Button>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
