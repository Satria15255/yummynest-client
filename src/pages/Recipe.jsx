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
            <header style={{ backgroundImage: `url(/image/recipePage.jpg)` }} className='h-[30vh] md:h-[60vh] w-full bg-cover bg-center flex items-center justify-center'>
                <p className='text-5xl md:text-8xl font-bold text-center text-gray-800'>Recipe</p>
            </header>
            <div className='w-full flex p-2 md:pl-7 items-center md:pt-4'>
                <p className='hidden md:flex text-lg font-semibold w-30'>Categoy :</p>
                <div className='w-full max-w-8xl overflow-x-auto scrollbar'>
                    <div className='flex gap-1 max-w-8xl'>
                        {category.map((cat) => (
                            <div className='py-3'>
                                <p
                                    key={cat}
                                    onClick={() => setActiveRecipe(cat)}
                                    className={`flex w-35 h-10 justify-center items-center text-center  transition font-bold text-sm md:py-2
                                    ${activeRecipe === cat ? "text-yellow-500 border rounded-full " : "hover:text-yellow-500"}`}>
                                    {cat}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <main className='p-2 md:p-5'>
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