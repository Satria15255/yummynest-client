import React, { useState } from 'react'
import { getSavedRecipes, toggleLikeRecipe, saveRecipe, unsavedRecipe } from '../service/recipe.service'
import { toast } from 'react-toastify'
import { getToken, getUserId, isLoggedIn } from '../utils/Auth'

const UseRecipeAction = () => {
    const [savedRecipe, setSavedRecipe] = useState([])

    // Like Recipe
    const handleLike = async (recipeId, setRecipes) => {
        if (!isLoggedIn()) {
            toast.warn("please login first. ")
            return
        }
        try {
            const res = await toggleLikeRecipe(recipeId)
            const { likes } = res.data

            setRecipes(prev =>
                prev.map(r =>
                    r._id === recipeId ? { ...r, likes } : r
                )
            )
        } catch (err) {
            console.error(err)
        }
    }

    // Handle Save
    const handleSave = async (recipeId) => {
        if (!isLoggedIn()) {
            toast.warn("please login first to save a recipe!")
            return
        }
        try {
            await saveRecipe(recipeId)
            setSavedRecipe(prev => [...prev, recipeId]) // ✅ tambahkan ID
            toast.success('Recipe saved successfully! ')
        } catch (err) {
            console.log(err)
            toast.error('Failed save recipe!')
        }
    }

    // Handle Unsave
    const handleUnSave = async (recipeId) => {
        try {
            await unsavedRecipe(recipeId)
            setSavedRecipe(prev => prev.filter(id => id !== recipeId)) // ✅ hapus ID
            toast.success('Recipe successfully removed from save list!')
        } catch (err) {
            console.log(err)
            toast.error('Failed to remove recipe from save list!')
        }
    }
    return {
        savedRecipe,
        setSavedRecipe,
        handleLike,
        handleSave,
        handleUnSave
    }
}

export default UseRecipeAction