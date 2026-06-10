import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../services/authService.js";
const Register = () => {
  const navigate = useNavigate();
const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  confirmpassword: "",
  role: "employee",
  employeeCount: "",
  companyName: "",
});
  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "role") {
    setFormData({
      ...formData,
      role: value,
      employeeCount: "",
      companyName: "",
    });
    return;
  }

  setFormData({
    ...formData,
    [name]: value,
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmpassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const data = await registerUser(formData);
      console.log(data);
      alert("Registration Successful! Please log in.");
      // Redirect to login page after successful registration
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data);
      alert("Registration Failed");
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <h2 className="mb-6 text-3xl font-bold text-center">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm password"
              value={formData.confirmpassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
                  </div>
           <div>
  <label className="block mb-2 font-medium">Role</label>

  <select
    name="role"
    value={formData.role}
    onChange={handleChange}
    className="w-full px-4 py-2 border rounded-lg"
    required
  >
    <option value="">Select Role</option>
    <option value="admin">Super Admin</option>
    <option value="employee">Employee</option>
    <option value="company">Company Admin</option>
  </select>
</div>

{/* Company Field */}
{formData.role === "company" && (
  <div>
    <label className="block mb-2 font-medium">
      Number of Employees
    </label>
    <input
      type="number"
      name="employeeCount"
      placeholder="Enter number of employees"
      value={formData.employeeCount}
      onChange={handleChange}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      required
    />
  </div>
)}

{/* Employee Field */}
{formData.role === "employee" && (
  <div>
    <label className="block mb-2 font-medium">
      Company Name
    </label>
    <input
      type="text"
      name="companyName"
      placeholder="Enter company name"
      value={formData.companyName}
      onChange={handleChange}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      required
    />
  </div>
)}
          <button
            type="submit"
            className="w-full py-2 text-white transition bg-green-600 rounded-lg hover:bg-green-700"
          >
            Register
          </button>
        </form>
        
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-semibold text-green-600 hover:underline"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;