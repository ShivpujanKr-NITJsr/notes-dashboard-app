import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import { api } from '../../../utils';
import { leftImage } from '../../../assets';

const SignUp = () => {
  const { login } = useAuthContext(); 
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation credentials here (API call, etc.)
    try {
      if(password.trim().length < 6){
        alert("Minimum six characters are required for password");
        return;
      }
      const response = await api.auth.register({ name: username, email, password });
      console.log("Signup response:", response);
      login(response.result, response.token); // Save user & token
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section with Illustration */}
      <div className="hidden md:flex flex-1 bg-blue-600 items-center justify-center">
        <img src={leftImage} alt="Illustration" className="w-1/2" />
      </div>

      {/* Right Section for Form */}
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="max-w-md w-full p-8 space-y-8">
          <h2 className="text-2xl font-bold text-gray-700">Sign Up</h2>
          <p className="text-gray-500">Create an account to get started with Smart Notes</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Username Field */}
            <div>
              <label className="block text-gray-700" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter your username"
                required
              />
            </div>

            {/* Email Address Field */}
            <div>
              <label className="block text-gray-700" htmlFor="email">Email Address</label>
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

            {/* Password Field */}
            <div>
              <label className="block text-gray-700" htmlFor="password">Password</label>
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

            {/* Sign Up Button */}
            <div>
              <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition duration-200"
              >
                Sign Up
              </button>
            </div>

            {/* Link to Login Page */}
            <div className="text-center">
              <p className="text-gray-500">Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
