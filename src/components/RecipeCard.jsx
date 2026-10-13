import React from 'react';


const RecipeCard = ({ recipe }) => {

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">

      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">

        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {recipe.name}
        </h2>

        <p className="text-gray-600 mb-3">
          Cuisine: {recipe.cuisine}
        </p>

        <div className="flex justify-between text-sm text-gray-500">

          <span>
            ⭐ {recipe.rating}
          </span>

          <span>
            ⏱ {recipe.cookTimeMinutes} min
          </span>

        </div>

      </div>

    </div>
  );
}

export default RecipeCard;