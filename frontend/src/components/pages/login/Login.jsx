import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "../../../utils";
import { leftImage } from "../../../assets";

const LoginPage = () => {
  const { isAuthenticated, login } = useAuthContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // In a real app, validate credentials here (API call, etc.)

    try {
      const response = await api.auth.login({ email, password });
      // console.log("Login response:", response);
      login(response.result, response.token); // Save user & token
    navigate("/");
    } catch (err) {
      console.error("Login error:", err);
    }
    

    // After successful login
    
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Redirect to dashboard if already authenticated
    }
  }, []); // Empty dependency array to run only once

  return (
    <div className="flex min-h-screen">
      {/* Left Section with Illustration */}
      <div className="flex-1 bg-blue-600 flex items-center justify-center">
        <img
          src={leftImage}
          alt="Illustration"
          className="w-1/2"
        />
      </div>

      {/* Right Section for Form */}
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="max-w-md w-full p-8 space-y-8">
          <h2 className="text-2xl font-bold text-gray-700">Hello,start Using Smart Notes!</h2>
          <p className="text-gray-500">Sign In to Get Started to Create Notes</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter your password"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
              >
                Login
              </button>
            </div>

            <div className="text-center">
              <p className="text-gray-500">
                Don't have an account?{" "}
                <a href="/signup" className="text-blue-600 hover:underline">
                  SignUp
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
