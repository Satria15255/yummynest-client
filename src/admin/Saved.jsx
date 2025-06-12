import React, { useEffect, useState } from 'react'
import axios from '../api/axiosInstance'
import SavedRecipeCard from './components/SavedRecipeCard'

const savedRecipe = () => {
  const [savedRecipes, setSavedRecipes] = useState([])

  const fetchSavedRecipes = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get('users/saved', {
        headers: {
          Authorizathion: `Bearer ${token}`
        }
      })
      setSavedRecipes(res.data)
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchSavedRecipes()
  }, [])

  const handleUnSave = async (recipeId) => {
    try {
      await axios.delete(`users/save/${recipeId}`)
      setSavedRecipes(savedRecipes.filter((r) => recipeId !== recipeId))
      alert('Resep berhasil dihapus')
      fetchSavedRecipes()
    } catch (err) {
      console.error('Gagal menghapus resep', err)
    }
  }

  return (
    <div className='p-5 mt-12'>
      <h1 className='mt-5 text-xl font-bold pb-3 mb-3 text-gray-500 border-b border-gray-400'>Saved Recipe</h1>
      <div>
        {savedRecipes.length === 0 ? (
          <p>TIdak ada resep tersimpan</p>
        ) : (
          savedRecipes.map((recipe) => (
            <SavedRecipeCard
              key={recipe._id}
              recipe={recipe}
              onUnSave={() => handleUnSave(recipe._id)}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default savedRecipe