import React, { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import { getRecipes, getSavedRecipes } from '../service/recipe.service'
import { getUserId, isLoggedIn } from '../utils/Auth'
import headerImage from '../assets/background.png'
import useRecipeActions from '../hooks/UseRecipeAction'

const RecipeOnTheWeek = () => {
    const [recipes, setRecipes] = useState([])
    const [activeRecipe, setActiveRecipe] = useState("All");
    const category = ["All", "Main Course", "Snack", "Dessert", "Drink", "Healthy", "Breakfast"]
    const userId = getUserId()

    const {
        savedRecipe,
        setSavedRecipe,
        handleLike,
        handleSave,
        handleUnSave
    } = useRecipeActions()

    useEffect(() => {
        getRecipes()
            .then(res => setRecipes(res.data))
            .catch(err => console.err(err))
    }, [])

    useEffect(() => {
        if (!isLoggedIn()) return

        getSavedRecipes()
            .then(res => {
                const ids = res.data.map(r => r._id)
                setSavedRecipe(ids)
            })
            .catch(() => setSavedRecipe([]))
    }, [setSavedRecipe])

    const filterRecipes = activeRecipe === "All" ? recipes : recipes.filter((recipes) => recipes.category === activeRecipe);

    return (
        <section className=' flex flex-col w-full mb-8'>
            <header style={{ backgroundImage: `url(${headerImage})` }} className='h-[60vh] w-full bg-cover bg-center flex items-center justify-center'>
                <p className='text-8xl font-bold text-center text-white'>Recipe</p>
            </header>
            <nav className='flex pl-7 items-center pt-4'>
                <p className='text-lg font-semibold'>Categoy :</p>
                <div>
                    {category.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveRecipe(cat)}
                            className={` transition font-bold px-7 py-2
                        ${activeRecipe === cat ? "text-yellow-500 border-b " : "hover:text-yellow-500"}`}>
                            {cat}
                        </button>
                    ))}
                </div>
            </nav>
            <main className='p-5'>
                <div className='w-full grid place-items-center grid-cols-2 md:grid-cols-3'>
                    {filterRecipes.map((recipe) => {
                        const isLiked = recipe.likes?.some(
                            id => id.toString() === userId)
                        const likesCount = recipe.likes?.length ?? 0
                        const commentsCount = recipe.comments?.length ?? 0
                        return (
                            <RecipeCard
                                key={recipe._id}
                                recipe={recipe}
                                onSave={() => handleSave(recipe._id)}
                                unSave={() => handleUnSave(recipe._id)}
                                saved={Array.isArray(savedRecipe) && savedRecipe.includes(recipe._id)}
                                handleLike={() => handleLike(recipe._id, setRecipes)}
                                isLiked={isLiked}
                                likesCount={likesCount}
                                commentsCount={commentsCount}
                            />
                        )
                    })}
                </div>
            </main>
        </section>
    )
}

export default RecipeOnTheWeek