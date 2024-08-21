import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    const adminCredentials = { email: "abcadmin@gmail.com", password: "123admin" };
    
    if (email === adminCredentials.email && password === adminCredentials.password) {
      // Admin login
      onLogin("admin");
      navigate("/dashboard");
    } else {
      // Staff login
      try {
        const response = await axios.post('http://localhost:8080/api/staff/login', { email, password });
        if (response.data) {
        
          onLogin("staff");
          navigate("/dashboard");
        } else {
          setError("Invalid email or password");
        }
      } catch (error) {
        console.error('Failed to login:', error);
        setError("Invalid email or password");
      }
    }

    setLoading(false); // Set loading state to false
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen sm:h-full md:h-screen bg-[#0e2139] px-4">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-[20px] shadow-md py-[30px] px-[26px] shadow-black">
        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="space-y-1">
            <div className="flex flex-col items-start space-y-2">
              <h4 className="text-[26px] text-[#0e2139] font-bold">ABC RESTAURANT</h4>
            </div>

            <h5 className="text-[26px] font-medium text-[#0e2139]">Login</h5>
            <h4 className="text-[16px] gray-700 text-[#0e2139]">Welcome back</h4>
          </div>
          {error && (
            <div
              className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
              role="alert"
            >
              <span className="sr-only">Error</span>
              <div>{error}</div>
            </div>
          )}
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="abc@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-[#0e2139] hover:bg-[#1c3453] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              disabled={loading} // Disable button when loading
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
