// RecipePages.jsx (Logic & Data Handler)
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RecipePagesCard from './RecipesPagesCard'
import { getRecipesById, getSavedRecipes } from '../service/recipe.service'
import { toast } from 'react-toastify'
import { getToken, getUserId, isLoggedIn } from '../utils/Auth'
import useRecipeActions from '../hooks/UseRecipeAction'

const RecipePages = () => {
    const { id } = useParams()
    const [recipe, setRecipe] = useState([])
    const [commentText, setCommentText] = useState('')
    const userId = getUserId()
    const {
        savedRecipe,
        setSavedRecipe,
        handleLike,
        handleSave,
        handleUnSave
    } = useRecipeActions()

    const fetchRecipes = async () => {
        try {
            const res = await getRecipesById(id)
            setRecipe(res.data)
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (!isLoggedIn()) return

        getSavedRecipes()
            .then(res => {
                const ids = res.data.map(r => r._id)
                setSavedRecipe(ids)
            })
            .catch(() => setSavedRecipe([]))
    }, [setSavedRecipe])

    useEffect(() => {
        fetchRecipes()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isLoggedIn()) {
            toast.warn("Please login first to post a comment!")
            return
        }
        try {
            await axios.post(`recipes/${id}/comments`, {
                text: commentText,
            })
            toast.success('Comment submitted successfully!')
            setCommentText('')
            fetchRecipes()
        } catch (err) {
            console.error(err)
            toast.error('Failed to submit comment')
        }
    }


    const handleDeleteComment = async (commentId) => {
        toast((t) => (
            <div className="p-4 bg-white rounded-xl shadow-md text-gray-800 max-w-xs">
                <p className="text-sm font-medium">Are you sure you want to delete the comment?</p>
                <div className="mt-4 flex justify-end gap-3">
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id)
                            try {
                                const token = localStorage.getItem('token')
                                await axios.delete(`/recipes/${id}/comments/${commentId}`, {
                                    headers: { Authorization: `Bearer ${token}` },
                                })
                                fetchRecipes()
                                toast.success("Successfully deleted comment")
                            } catch (err) {
                                console.error(err)
                                toast.error("failed to delete comment")
                            }
                        }}
                        className="w-1/5 py-1 flex items-center justify-center text-sm rounded-md bg-orange-300 font-bold hover:bg-orange-400 transition"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-1/5 py-1 text-sm rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), {
            duration: 7000, // toast akan hilang otomatis jika user diamkan
            position: 'top-center',
        })
    }


    return (
        <RecipePagesCard
            recipe={recipe}
            saved={Array.isArray(savedRecipe) && savedRecipe.includes(id)}
            commentText={commentText}
            onCommentChange={(e) => setCommentText(e.target.value)}
            onCommentSubmit={handleSubmit}
            onDeleteComment={handleDeleteComment}
            onSave={handleSave}
            onUnsave={handleUnSave}
            userId={userId}
        />

    )
}

export default RecipePages
