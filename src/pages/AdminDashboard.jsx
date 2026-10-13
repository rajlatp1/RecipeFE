import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addRecipe, editRecipe, getRecipes, deleteRecipe } from '../services/allAPI';


const AdminDashboard = () => {

  const [formData, setformData] = useState({name:' ', ingredience:'',instruction:'',preparation:'',image:'',cuisine:'' });
  const [editId, seteditId] = useState(null);


  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  const navigate = useNavigate();




const handleSubmit = async(e) => {
  e.preventDefault() ;
  try {
    const token = localStorage.getItem("token");
    const reqHeader = {Authorization:`Bearer ${token}`}
    let result
    if (editId) {
       result = await editRecipe(formData, reqHeader, editId)
    }else{
       result = await addRecipe(formData, reqHeader)
    }
    if (result.status === 200) {
      alert(editId?"Recipe updated successfully":"Recipe added successfully")
      resetForm()
      getRecipe()
    } 
  } catch (err) {
    alert("something went wrong1")
    console.log(err)
  }
}

const handleEdit = async(recipe) =>{
  seteditId(recipe._id);
  setformData({
    name:recipe.name, 
    ingredience:Array.isArray(recipe.ingredience)?recipe.ingredience.join(""):recipe.ingredience ,
    instruction: Array.isArray(recipe.instruction)?recipe.instruction.join(","):recipe.instruction,
    preparation:recipe.preparation,
    image:recipe.image,
    cuisine:recipe.cuisine
  })
}

const handleDelete = async(id) =>{
  const confirmDelete = window.confirm("Are you really want to delete the recipe?")
  try {
    const token =  localStorage.getItem("token");
    const reqHeader = {Authorization:`Bearer ${token}`}
    const result = await deleteRecipe(reqHeader, id)
    console.log("Token:", localStorage.getItem("token"));
    if(result.status === 200) {
      alert("Deleted successfully");
      getRecipe()
    }
  }catch(err) {
    alert(err)
  }
}

const resetForm = () => {
  setformData({name:' ', ingredience:'',instruction:'',preparation:'',image:'',cuisine:''})
}

const getRecipe = async() =>{
  try {
    const token = localStorage.getItem("token");
    const reqHeader = {Authorization:`Bearer ${token}`}
    const result = await getRecipes(reqHeader)
    if (result.status === 200) {
      setRecipes(result.data.recipes)
    } 
  }catch(err) {
    alert("something went wrong..")
    console.log(err)
  }
}

const handleChange = async(e) => {
  setformData({...formData, [e.target.name]:e.target.value})
}



useEffect(()=>{
  getRecipe()
},[])
  return (
<div className="min-h-screen bg-gray-50 p-6">

      {/* ================= HEADER ================= */}

      <div className="max-w-7xl mx-auto mb-8">

        <h1 className="text-3xl font-bold text-gray-900">
          Admin Recipe Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your recipes
        </p>

      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* ================= FORM ================= */}

        <div className="bg-white rounded-2xl shadow p-6">

          { <h2 className="text-xl font-bold mb-5">
            {editId ? "Update Recipe" : "Add Recipe"}
          </h2> }

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Recipe name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3"
            />

            <textarea
              name="ingredience"
              placeholder="Ingredients"
              value={formData.ingredience}
              onChange={handleChange}
              required
              rows="4"
              className="w-full border rounded-xl px-4 py-3"
            />

            <textarea
              name="instruction"
              placeholder="Instructions"
              value={formData.instruction}
              onChange={handleChange}
              required
              rows="5"
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="number"
              name="preparation"
              placeholder="Preparation time"
              value={formData.preparation}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              name="cuisine"
              placeholder="Cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />





            <div className="flex gap-3">

              <button
                type="submit"
                className="flex-1 bg-black text-white rounded-xl py-3 font-semibold"
              >
                {
                   editId
                  ? "Update Recipe"
                  : "Add Recipe"}
              </button>

              {/*editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 bg-gray-200 rounded-xl"
                >
                  Cancel
                </button>
              )*/}

            </div>

          </form>

        </div>

        {/* ================= RECIPE LIST ================= */}

        <div className="lg:col-span-2">

          <div className="bg-white rounded-2xl shadow overflow-hidden">

            <div className="p-6 border-b">

              <h2 className="text-xl font-bold">
                Recipe List
              </h2>

              <p className="text-sm text-gray-500">
                Total recipes: {recipes.length}
              </p>

            </div>

            <div className="divide-y">

              {recipes.length === 0 ? (

                <div className="p-8 text-center text-gray-500">
                  No recipes found
                </div>

              ) : (

                recipes.map((recipe) => (

                  <div
                    key={recipe._id}
                    className="p-5 flex gap-5 items-center"
                  >

                    {/* IMAGE */}

                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />

                    {/* DETAILS */}

                    <div className="flex-1">

                      <h3 className="font-bold text-lg">
                        {recipe.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {recipe.cuisine}
                      </p>

                      <div className="flex gap-4 text-xs text-gray-400 mt-2">
                        <span>
                          Prep: {recipe.preparation} min
                        </span>

                      </div>

                    </div>

                    {/* ACTIONS */}

                    <div className="flex gap-2">

                      <button
                        onClick={() => handleEdit(recipe)}
                        className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(recipe._id)}
                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-semibold"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};


export default AdminDashboard;