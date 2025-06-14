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
        const confirmDelete = window.confirm("Yakin ingin menghapus komentar ini?")
        if (!confirmDelete) return

        try {
            const token = localStorage.getItem('token')
            await axios.delete(`/recipes/${id}/comments/${commentId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            fetchRecipes()
        } catch (err) {
            console.error(err)
            alert("Gagal hapus komentar")
        }
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
