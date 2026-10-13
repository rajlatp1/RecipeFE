import React, { useEffect, useState } from 'react';

import { getRecipes } from '../services/recipeApi';

import RecipeCard from '../components/RecipeCard';


const Home = () => {

  const [recipes, setRecipes] = useState([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchRecipes = async () => {

      try {

        const data = await getRecipes();

        setRecipes(data);

      } catch (error) {

        console.error("Error fetching recipes:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchRecipes();

  }, []);


  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Hero Section */}

      <section className="bg-orange-100 py-16">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Delicious Recipes
          </h1>

          <p className="text-gray-600 text-lg">
            Discover simple and delicious recipes for every occasion.
          </p>

        </div>

      </section>


      {/* Recipe Section */}

      <section className="max-w-7xl mx-auto px-6 py-12">

        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Popular Recipes
        </h2>


        {loading ? (

          <p className="text-center text-gray-600">
            Loading recipes...
          </p>

        ) : (

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {recipes.map((recipe) => (

              <RecipeCard
                key={recipe.id}
                recipe={recipe}
              />

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default Home;