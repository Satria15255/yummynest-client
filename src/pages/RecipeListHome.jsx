import React, { useEffect, useState } from 'react'
import RecipeList from '../components/RecipeList'
import axios from '../api/axiosInstance'

const RecipeOnTheWeek = () => {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await axios.get('/recipes')
                setRecipes(res.data)
            } catch (err) {
                console.error("Gagal mengambil data resep", err)
            }
        }

        fetchRecipes()
    }, [])

    const handleSave = async (recipeId) => {
        try {
            const token = localStorage.getItem('token')
            await axios.post(`users/save/${recipeId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            })
            alert('Resep berhasil disimpan')
        } catch (err) {
            alert('Gagal menyimpan resep')
            console.log(err)
        }
    }


    return (
        <div className=' flex flex-col w-full mb-8'>
            <h1 className='text-2xl font-bold text-gray-500 p-4 border-b border-gray-200 m-4'>Recommendations this week</h1>
            <div className='p-5'>
                <div className='w-full grid place-items-center grid-cols-4 gap-2'>
                    {recipes.map((recipe) => (
                        <RecipeList
                            key={recipe._id}
                            recipe={recipe}
                            onDelete={() => handleDelete(recipe._id)}
                            onSave={() => handleSave(recipe._id)
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RecipeOnTheWeek