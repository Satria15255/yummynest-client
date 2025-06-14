import React, { useEffect, useState } from 'react'
import RecipeList from '../components/RecipeList'
import axios from '../api/axiosInstance'
import { toast } from 'react-toastify'
import { getToken, getUserId, isLoggedIn } from '../utils/Auth'


const RecipeOnTheWeek = () => {
    const [recipes, setRecipes] = useState([])
    const [savedRecipes, setSavedRecipes] = useState([])
    const userId = getUserId()
    const token = getToken()

    const fetchRecipes = async () => {
        try {
            const res = await axios.get('/recipes')
            setRecipes(res.data)
        } catch (err) {
            console.error("Gagal mengambil data resep", err)
        }
    }

    const fetchSavedRecipes = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await axios.get('/users/saved', {
                headers: { Authorization: `Bearer ${token}` }
            })

            // Ambil hanya id-nya saja dari resep yang disimpan
            const savedIds = res.data.map((r) => r._id)
            setSavedRecipes(savedIds)
        } catch (err) {
            console.error("Gagal mengambil daftar resep tersimpan", err)
            setSavedRecipes([]) // fallback
        }
    }


    useEffect(() => {
        fetchRecipes()
        fetchSavedRecipes()
    }, [])


    const handleSave = async (recipeId) => {
        if (!isLoggedIn()) {
            toast.warn("Please login first to save a recipe!")
            return
        }
        try {
            const token = localStorage.getItem('token')
            await axios.post(`users/save/${recipeId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            })

            setSavedRecipes(prev => [...prev, recipeId]) // ✅ tambahkan ID
            toast.success('Recipe saved successfully! ')
        } catch (err) {
            toast.error('Failed save recipe!')
            console.log(err)
        }
    }

    const handleUnSave = async (recipeId) => {
        try {
            const token = localStorage.getItem('token')
            await axios.delete(`users/save/${recipeId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            setSavedRecipes(prev => prev.filter(id => id !== recipeId)) // ✅ hapus ID
            toast.success('Recipe successfully removed from save list!')
            fetchRecipes()
        } catch (err) {
            console.error('Failed to delete recipe from save list :(', err)
        }
    }


    return (
        <div className=' flex flex-col w-full mb-8'>
            <h1 className='text-2xl font-bold text-gray-500 p-4 border-b border-gray-200 m-4'>Latest Recipe</h1>
            <div className='p-5'>
                <div className='w-full px-10 grid place-items-center grid-cols-4 gap-5'>
                    {recipes.map((recipe) => (
                        <RecipeList
                            key={recipe._id}
                            recipe={recipe}
                            onSave={() => handleSave(recipe._id)}
                            unSave={() => handleUnSave(recipe._id)}
                            saved={Array.isArray(savedRecipes) && savedRecipes.includes(recipe._id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RecipeOnTheWeek