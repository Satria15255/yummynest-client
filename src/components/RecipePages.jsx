// RecipePages.jsx (Logic & Data Handler)
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../api/axiosInstance'
import RecipePagesCard from './RecipesPagesCard'
import { toast } from 'react-toastify'
import { getToken, getUserId, isLoggedIn } from '../utils/Auth'

const RecipePages = () => {
    const { id } = useParams()
    const [recipe, setRecipe] = useState([])
    const [commentText, setCommentText] = useState('')
    const [saved, setSaved] = useState(false)
    const userId = getUserId()
    const token = getToken()

    const fetchRecipes = async () => {
        try {
            const res = await axios.get(`recipes/${id}`)
            setRecipe(res.data)
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const chekIfSaved = async () => {
        if (!isLoggedIn) {
            setSaved(false)
            return
        }

        try {
            const res = await axios.get('/users/saved', {
                hedares: { Authorization: `Bearer ${token}` }
            })

            const saveIds = res.data.map(r => r._id)
            setSaved(saveIds.includes(id))
        } catch (err) {
            console.error("gagal memeriksa status simpan", err)
            setSaved(false)
        }
    }

    useEffect(() => {
        fetchRecipes()
        chekIfSaved()
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

    const handleSave = async () => {
        if (!isLoggedIn()) {
            toast.warn("Please login first to save a recipe!")
            return
        }
        try {
            await axios.post(`users/save/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            })
            setSaved(true)
            toast.success('Recipe saved!')
        } catch (err) {
            toast.error('Failed save recipe')
            console.log(err)
        }
    }

    const handleUnSave = async () => {
        try {
            await axios.delete(`users/save/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            setSaved(false)
            toast.success('Recipe successfully removed from save list!')
            fetchRecipes()
        } catch (err) {
            console.error('Gagal menghapus resep', err)
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
            saved={saved}
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
