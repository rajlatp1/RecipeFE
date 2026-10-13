import React from 'react';
import { Link } from "react-router-dom";


const Navbar = () => {
return (
    <nav className="bg-orange-500 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <Link to="/" className="text-2xl font-bold">
          RecipeHub
        </Link>

        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-orange-100">
            Home
          </Link>

          <Link to="/login" className="hover:text-orange-100">
            Login
          </Link>

          <Link
            to="/register"
            className="bg-white text-orange-500 px-4 py-2 rounded-lg hover:bg-orange-100"
          >
            Register
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar