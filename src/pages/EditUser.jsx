import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const EditUser = () => {

  const { id } = useParams();

  const navigate = useNavigate();


  const [username, setUsername] = useState('');

  const [email, setEmail] = useState('');

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    fetchUser();

  }, [id]);


  const fetchUser = async () => {

    try {

      const response = await fetch(
        `http://localhost:5000/api/users/${id}`
      );

      const data = await response.json();

      setUsername(data.username);

      setEmail(data.email);

    } catch (error) {

      console.error('Error fetching user:', error);

    } finally {

      setLoading(false);

    }

  };


  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      const response = await fetch(
        `http://localhost:5000/api/users/${id}`,
        {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            username,
            email
          })
        }
      );


      if (response.ok) {

        alert('User updated successfully');

        navigate('/admin');

      }

    } catch (error) {

      console.error('Error updating user:', error);

    }

  };


  if (loading) {

    return (
      <div className="text-center p-10">
        Loading...
      </div>
    );

  }


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-6 py-10">

      <div className="bg-white w-full max-w-lg p-8 rounded-xl shadow-md">

        <h1 className="text-2xl font-bold mb-6">
          Edit User
        </h1>


        <form onSubmit={handleSubmit}>

          <div className="mb-5">

            <label className="block mb-2 text-gray-700">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
              required
            />

          </div>


          <div className="mb-6">

            <label className="block mb-2 text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
              required
            />

          </div>


          <div className="flex gap-3">

            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
            >
              Update
            </button>


            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="bg-gray-300 px-6 py-3 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};


export default EditUser;