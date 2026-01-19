import React, { useEffect, useState } from 'react'
import { popularRecipes, getSavedRecipes } from '../service/recipe.service'
import RecipeCard from '../components/RecipeCard'
import { getUserId, isLoggedIn } from '../utils/Auth'
import PopularCarousel from '../components/PopularCarousel'
import useRecipeAction from '../hooks/UseRecipeAction'

const PopularRecipe = () => {
    const [recipes, setRecipes] = useState([])

    const {
        savedRecipe,
        setSavedRecipe,
        handleLike,
        handleSave,
        handleUnSave
    } = useRecipeAction()
    const userId = getUserId()

    const fetchPopularRecipe = async () => {
        try {
            const res = await popularRecipes()
            console.log(res.data)
            setRecipes(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPopularRecipe()
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

    const isLiked = recipes.likes?.some(
        id => id.toString() === userId
    )
    const likesCount = recipes.likesCount ?? 0
    const commentsCount = recipes.comments?.length ?? 0


    return (
        <section className="pt-7 mb-13 border-t border-yellow-200 p-5">
            <header className='my-8 text-center'>
                <p className='text-3xl font-bold'>Popular <span className='text-orange-300'>Recipe</span></p>
                <p className='text-sm'>Some of the Culinary Enthusiasts' Favorite Recipes</p>
            </header>
            {/* Desktop */}
            <main className='hidden md:flex justify-center items-center px-6 gap-5'>
                {recipes.slice(0, 3).map((r) => {
                    const isLiked = r.likes?.some(
                        id => id.toString() === userId
                    )
                    const likesCount = r.likesCount ?? 0
                    const commentsCount = r.comments?.length ?? 0
                    return (
                        <RecipeCard key={r._id} recipe={r}
                            handleLike={() => handleLike(r._id, setRecipes)}
                            saved={Array.isArray(savedRecipe) && savedRecipe.includes(r._id)}
                            onSave={() => handleSave(r._id)}
                            unSave={() => handleUnSave(r._id)}
                            isLiked={isLiked}
                            likesCount={likesCount}
                            commentsCount={commentsCount}
                        />
                    )
                })}
            </main>

            {/* Mobile */}
            <main className='md:hidden'>
                <PopularCarousel
                    recipe={recipes}
                    handleLike={() => handleLike(recipes._id, setRecipes)}
                    saved={Array.isArray(savedRecipe) && savedRecipe.includes(recipes._id)}
                    onSave={() => handleSave(recipes._id)}
                    unSave={() => handleUnSave(recipes._id)}
                    isLiked={isLiked}
                    likesCount={likesCount}
                    commentsCount={commentsCount}
                />

            </main>
        </section>
    )
}

export default PopularRecipe