import React, { useEffect, useState } from 'react'
import { getRecipes, saveRecipe, getSavedRecipes, unsavedRecipe, toggleLikeRecipe } from './service/recipe.service'
import { toast } from 'react-toastify'
import PopularRecipe from './pages/PopularRecipe'
import RecipeListHome from './pages/LatestRecipe'

const HomePage = () => {
    const [recipe, setRecipe] = useState([])
    const [savedRecipes, setSavedRecipes] = useState([])

    const fetchRecipes = async () => {
        try {
            const res = await getRecipes()
            setRecipe(res.data)
            console.log(res.data)
        } catch (err) {
            console.error("Gagal mengambil daftar resep", err)
        }
    }

    useEffect(() => {
        fetchRecipes()
    }, [])

    const fetchSavedRecipes = async () => {
        try {
            const res = await getSavedRecipes()
            // Ambil hanya id-nya saja dari resep yang disimpan
            const savedIds = res.data.map((r) => r._id)
            setSavedRecipes(savedIds)
            console.log(savedIds)
        } catch (err) {
            console.error("Gagal mengambil daftar resep tersimpan", err)
            setSavedRecipes([]) // fallback
        }
    }



    const handleLike = async (recipeId) => {
        try {
            const res = await toggleLikeRecipe(recipeId)
            const { likes } = res.data

            setRecipe(prev =>
                prev.map(r =>
                    r._id === recipeId
                        ? { ...r, likes }
                        : r
                )
            )
        } catch (err) {
            console.error(err)
        }
    }



    const handleSave = async (recipeId) => {
        if (!isLoggedIn()) {
            toast.warn("Please login first to save a recipe!")
            return
        }
        try {
            await saveRecipe(recipeId)
            setSavedRecipes(prev => [...prev, recipeId]) // ✅ tambahkan ID
            toast.success('Recipe saved successfully! ')
        } catch (err) {
            toast.error('Failed save recipe!')
            console.log(err)
        }
    }

    const handleUnSave = async (recipeId) => {
        try {
            await unsavedRecipe(recipeId)
            setSavedRecipes(prev => prev.filter(id => id !== recipeId)) // ✅ hapus ID
            toast.success('Recipe successfully removed from save list!')
            fetchRecipes()
        } catch (err) {
            console.error('Failed to delete recipe from save list :(', err)
        }
    }

    return (
        <div>
            <p>testt</p>
            <PopularRecipe recipes={recipe} savedRecipes={savedRecipes} handleSave={handleSave} handleUnSave={handleUnSave} />
            <RecipeListHome recipe={recipe} />
        </div>
    )
}

export default HomePage