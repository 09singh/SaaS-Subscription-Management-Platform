import { useState } from "react";
import { loginUser } from "../../../services/authService.js";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await loginUser(formData);
    console.log(data);

    // Route based on user role
    const routes = {
      admin: "/superadmin/companies",
      employee: "/employee/profile",
      company: "/company/form",
    };

    const redirectPath = routes[data.role] || "/";
    navigate(redirectPath);
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <h2 className="mb-6 text-3xl font-bold text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="font-semibold text-blue-600 hover:underline"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;