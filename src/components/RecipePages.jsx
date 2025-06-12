// RecipePages.jsx (Logic & Data Handler)
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../api/axiosInstance'
import RecipePagesCard from './RecipesPagesCard'


const RecipePages = ({ token }) => {
    const { id } = useParams()
    const [recipe, setRecipe] = useState([])
    const [commentText, setCommentText] = useState('')
    const [saved, setSaved] = useState(false)
    const userId = localStorage.getItem('userId')

    const fetchRecipes = async () => {
        try {
            const res = await axios.get(`recipes/${id}`)
            setRecipe(res.data)
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchRecipes()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`recipes/${id}/comments`, {
                text: commentText,
            })
            alert('Comment submitted successfully!')
            setCommentText('')
            fetchRecipes()
        } catch (err) {
            console.error(err)
            alert('Failed to submit comment')
        }
    }

    const handleSave = async () => {
        try {
            await axios.post(`users/save/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            })
            setSaved(true)
            alert('Resep berhasil disimpan')
        } catch (err) {
            alert('Gagal menyimpan resep')
            console.log(err)
        }
    }

    const handleUnSave = async () => {
        try {
            await axios.delete(`users/save/${id}`)
            setSaved(false)
            alert('Resep berhasil dihapus dari daftar simpan')
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
