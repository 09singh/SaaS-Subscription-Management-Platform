// import { useEffect, useState } from 'react';
// import employeeService from '../../services/employeeService';
// import LoadingSpinner from '../../components/LoadingSpinner';
// import ErrorMessage from '../../components/ErrorMessage';
// import Button from '../../components/Button';

// export default function Profile() {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await employeeService.getProfile();
//       setProfile(data);
//     } catch (err) {
//       setError(err.message || 'Failed to load profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const loadData = async () => {
//       await fetchProfile();
//     };
//     loadData();
//   }, []);

//   if (loading) return <LoadingSpinner />;

//   return (
//     <div className="max-w-2xl">
//       <h1 className="mb-6 text-3xl font-bold text-gray-900">My Profile</h1>

//       {error && <ErrorMessage message={error} onRetry={fetchProfile} />}

//       {profile && (
//         <div className="p-8 bg-white rounded-lg shadow-md">
//           <div className="space-y-6">
//             <div className="flex items-center gap-4">
//               <div className="flex items-center justify-center w-16 h-16 text-2xl text-white bg-blue-600 rounded-full">
//                 {profile.name?.charAt(0) || 'U'}
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
//                 <p className="text-gray-600">{profile.email}</p>
//               </div>
//             </div>

//             <div className="pt-6 border-t">
//               <div className="grid grid-cols-1 gap-4">
//                 <div>
//                   <label className="text-sm font-medium text-gray-500">Email</label>
//                   <p className="text-lg text-gray-900">{profile.email}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-500">Company</label>
//                   <p className="text-lg text-gray-900">{profile.company || 'N/A'}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-500">Role</label>
//                   <p className="text-lg text-gray-900">{profile.role || 'Employee'}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-500">Joined</label>
//                   <p className="text-lg text-gray-900">
//                     {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="flex gap-3 pt-4">
//               <Button variant="primary">Edit Profile</Button>
//               <Button variant="secondary">Change Password</Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

export default function Profile() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-3xl mx-auto overflow-hidden bg-white shadow-lg rounded-2xl">
        
        {/* Header */}
        <div className="h-32 bg-blue-600"></div>

        {/* Profile Info */}
        <div className="flex flex-col items-center px-6 pb-6 -mt-16">
          <img
            src="https://i.pravatar.cc/150"
            alt="Profile"
            className="w-32 h-32 border-4 border-white rounded-full shadow-md"
          />

          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            Sanket Singh
          </h2>

          <p className="text-gray-500">Frontend Developer</p>

          <span className="px-3 py-1 mt-2 text-sm text-green-700 bg-green-100 rounded-full">
            Active Employee
          </span>
        </div>

        {/* Details */}
        <div className="grid gap-4 px-6 pb-6 md:grid-cols-2">
          <div className="p-4 rounded-lg bg-gray-50">
            <h3 className="font-semibold text-gray-700">Employee ID</h3>
            <p className="text-gray-600">EMP001</p>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <h3 className="font-semibold text-gray-700">Department</h3>
            <p className="text-gray-600">Development</p>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <h3 className="font-semibold text-gray-700">Email</h3>
            <p className="text-gray-600">sanket@example.com</p>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <h3 className="font-semibold text-gray-700">Phone</h3>
            <p className="text-gray-600">+91 9876543210</p>
          </div>
        </div>

        {/* Button */}
        {/* <div className="px-6 pb-6 text-center">
          <button className="px-6 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700">
            Edit Profile
          </button> */}
        {/* </div> */}
      </div>
    </div>
    );
}