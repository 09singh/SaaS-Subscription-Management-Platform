import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
    return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">
            SubSync
          </h1>

          <div className="hidden md:flex gap-8">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
          </div>

          <div className="flex gap-3">
                      <button className="border border-blue-600 px-4 py-2 rounded-lg"
                      onClick={() => {navigate("/login")}}>
              Login
            </button>

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={() => {navigate("/register")}}>
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl font-bold leading-tight">
              Manage Company Subscriptions
              <span className="text-blue-600">
                {" "}Effortlessly
              </span>
            </h1>

            <p className="text-gray-600 mt-6 text-lg">
              Track plans, manage employees,
              monitor revenue, and control
              subscriptions from one dashboard.
            </p>

            <div className="mt-8 flex gap-4">
              <button 
                onClick={() => navigate("/register")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Get Started
              </button>

              <button className="border px-6 py-3 rounded-lg hover:bg-gray-50 transition">
                Learn More
              </button>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692"
              alt="dashboard"
              className="rounded-xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="py-20 max-w-7xl mx-auto px-6"
      >
        <h2 className="text-4xl font-bold text-center mb-12">
          Features
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="p-6 shadow rounded-lg">
            <h3 className="font-bold text-xl mb-2">
              Subscription Tracking
            </h3>
            <p>Monitor all active plans.</p>
          </div>

          <div className="p-6 shadow rounded-lg">
            <h3 className="font-bold text-xl mb-2">
              Employee Management
            </h3>
            <p>Add and manage employees.</p>
          </div>

          <div className="p-6 shadow rounded-lg">
            <h3 className="font-bold text-xl mb-2">
              Revenue Analytics
            </h3>
            <p>Track revenue and growth.</p>
          </div>

          <div className="p-6 shadow rounded-lg">
            <h3 className="font-bold text-xl mb-2">
              Role Based Access
            </h3>
            <p>Admin, Company & Employee.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="bg-gray-50 py-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Pricing
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow">
              <h3 className="text-2xl font-bold">
                Basic
              </h3>
              <p className="text-4xl font-bold my-4">
                ₹499
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow border-2 border-blue-600">
              <h3 className="text-2xl font-bold">
                Premium
              </h3>
              <p className="text-4xl font-bold my-4">
                ₹999
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow">
              <h3 className="text-2xl font-bold">
                Enterprise
              </h3>
              <p className="text-4xl font-bold my-4">
                Custom
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-10 text-center">
        <h3 className="text-2xl font-bold">
          SubSync
        </h3>

        <p className="mt-2">
          Smart Subscription Management Platform
        </p>
      </footer>
    </div>
  );
};

export default Home;