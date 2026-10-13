import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerAPI } from '../services/allAPI';

const Register = () => {

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.userName || !formData.email || !formData.password) {
      alert("Please fill all required fields");
      return;
    }

    try {

      const result = await registerAPI({
        userName: formData.userName,
        email: formData.email,
        password: formData.password
      });

      if (result.status === 200) {
        alert("Registered successfully");
      } else {
        alert("Registration failed");
      }

    } catch (err) {
      alert("Something went wrong");
      console.log(err);
    }

    console.log(formData.userName, formData.email);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-md">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="mb-4">

            <label className="block text-gray-700 mb-2">
              Name
            </label>

            <input
              type="text"
              value={formData.userName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  userName: e.target.value
                })
              }
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

          </div>

          {/* Email */}
          <div className="mb-4">

            <label className="block text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value
                })
              }
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

          </div>

          {/* Password */}
          <div className="mb-6">

            <label className="block text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value
                })
              }
              placeholder="Create a password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600"
          >
            Register
          </button>

        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}

          <Link
            to="/login"
            className="text-orange-500 font-semibold"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;