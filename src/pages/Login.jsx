import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI } from '../services/allAPI';


const Login = () => {

    const [formData, setFormData] = useState({
    email: '',
    password: ''
    }); 

  const navigate = useNavigate()
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.email || !formData.password) {
        alert("Please enter the credentials");
        return 
    }
    try {
        const result = await loginAPI(formData)
        if(result.status === 200) {
            localStorage.setItem("token", result.data.token)
            localStorage.setItem("user", JSON.stringify(result.data.user))
            alert(result.data.message)
            if(result.data.user.email == 'admin@gg.com') {
                navigate('/admin')
            } else{
                navigate('/home')
            }

        }
    }catch(err) {
            console.log(err)
            alert("error in login")
    }


  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-md">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>


        <form onSubmit={handleSubmit}>

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
              }              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

          </div>


          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600"
          >
            Login
          </button>

        </form>


        <p className="text-center text-gray-600 mt-6">

          Don't have an account?{' '}

          <Link
            to="/register"
            className="text-orange-500 font-semibold"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;