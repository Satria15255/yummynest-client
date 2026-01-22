import React, { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import { getRecipes, toggleLikeRecipe, getSavedRecipes, saveRecipe, unsavedRecipe } from '../service/recipe.service'
import { toast } from 'react-toastify'
import { getToken, getUserId, isLoggedIn } from '../utils/Auth'
import { NavLink } from 'react-router-dom'
import useRecipeActions from '../hooks/UseRecipeAction'


const LatestRecipe = () => {
    const [recipes, setRecipes] = useState([])
    const {
        savedRecipe,
        setSavedRecipe,
        handleLike,
        handleSave,
        handleUnSave
    } = useRecipeActions()
    const userId = getUserId()

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


    return (
        <div className=' flex flex-col w-full mb-8 mt-12'>
            <header className='my-8 text-center'>
                <p className='text-3xl font-bold'>Latest <span className='text-orange-300'>Recipe</span></p>
                <p className='text-sm '>some of the Latest Recipes from Culinary Lovers</p>
            </header>
            <div className='p-2 md:p-5'>
                <div className='w-full lg:px-10 grid place-items-center grid-cols-2 md:grid-cols-3 gap-3'>
                    {recipes.slice(0, 6).map((recipe) => {
                        const isLiked = recipe.likes?.some(
                            id => id.toString() === userId
                        )
                        return (
                            <RecipeCard
                                key={recipe._id}
                                recipe={recipe}
                                onSave={() => handleSave(recipe._id)}
                                unSave={() => handleUnSave(recipe._id)}
                                saved={Array.isArray(savedRecipe) && savedRecipe.includes(recipe._id)}
                                handleLike={() => handleLike(recipe._id, setRecipes)}
                                isLiked={isLiked}
                                likesCount={recipe.likes?.length ?? 0}
                                commentsCount={recipe.comments?.length ?? 0}
                            />
                        )
                    })}
                </div>
                <div className='flex justify-center'>
                    <NavLink as={NavLink} to="/recipe" className='text-center pt-8 font-bold text-sm md:text-lg text-gray-600 hover:text-black transition duration-100'>View others recipe</NavLink>
                </div>
            </div>
        </div>
    )
}

export default LatestRecipe