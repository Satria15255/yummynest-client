import axios from '../api/axiosInstance'
import React, { useEffect, useState } from 'react'
import { FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify'



const EditRecipe = ({ isOpen, onClose, recipe, onUpdated }) => {
    const [formData, setFormData] = useState(recipe || {})
    const [selectedImage, setSelectedImage] = useState(null)
    const [comments, setComments] = useState([])
    const [token, setToken] = useState("")

    useEffect(() => {
        setFormData(recipe || {})
        setToken(localStorage.getItem("token") || "")

        const fetchRecipeDetails = async () => {
            if (recipe?._id) {
                try {
                    const res = await axios.get(`/recipes/${recipe._id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                    setComments(res.data.comments || [])
                } catch (err) {
                    console.error("Error", err)
                }
            }
        }

        fetchRecipeDetails()
    }, [recipe])

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const form = new FormData()
            form.append('title', formData.title)
            form.append('description', formData.description)
            form.append('ingredients', formData.ingredients)
            form.append('steps', formData.steps)
            if (selectedImage) {
                form.append('image', selectedImage)
            }

            console.log("Data yang di kirim:", formData)
            const res = await axios.put(`recipes/${recipe._id}`, form, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
            })
            console.log("Response dari server:", res.data)

            onUpdated(res.data)
            toast.success("Berhasil update resep")
            onClose()
        } catch (err) {
            console.log(err)
            toast.error("Gagal update resep")
        }
    }


    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`/recipes/${recipe._id}/comments/${commentId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setComments(prev => prev.filter(c => c._id !== commentId))
        } catch (err) {
            console.error("Gagal hapous komentar", err)
            toast.dismiss("Gagal hapus komentar")
        }
    }

    if (!isOpen) return null


    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-3 rounded-xl shadow-lg w-full md:w-4/5 overflow-y-auto max-h-[100vh] md:max-h-[95vh]">
                <div className='grid justify-items-center grid-cols-1 md:grid-cols-2'>
                    <div className='w-full md:w-4/5'>
                        <form onSubmit={handleSubmit}>
                    {selectedImage ? (
                        <img src={URL.createObjectURL(selectedImage)}
                            alt="preview"
                                    className="w-full mt-2 rounded-xl" />
                    ) : (
                        recipe?.image && (
                                        <img src={recipe.image} alt="resep" className='w-full  rounded-xl mb-2' />
                        )
                    )}
                            <input type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files[0])} className='py-1 hover:bg-black hover:text-white transition duration-100 px-2 w-full rounded-lg border' />
                </form>
                        <div className='mt-2 overflow-y-auto max-h-[20vh]'>
                    {comments.length === 0 ? (
                                <p>No comments yet</p>
                    ) : (
                        comments.map((comment) => (
                            <div key={comment._id} className='bg-gray-300 p-2 rounded-lg mb-2'>
                                <div className='flex justify-between items-center  gap-2'>
                                    <div>
                                        <p className='font-bold text-lg'>@{comment.user?.username || "Anonym"}</p>
                                        <p className='text-sm'>{comment.text}</p>
                                        <p className='text-xs text-gray-500 mt-1'>{new Date(comment.createdAt).toLocaleDateString()}</p>
                                </div>
                                <button
                                        onClick={() => handleDeleteComment(comment._id)}
                                        className='text-gray-500 hover:text-black transition duration-100'
                                    >
                                        <FaTrash />

                                </button>
                                </div>
                            </div>
                        ))
                            )}
                        </div>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit} className="space-y-2">
                            <label className='text-lg font-bold '>Food Name</label>
                            <input name="title" value={formData.title || ""} onChange={handleChange} className="w-full border px-1 rounded" placeholder="Judul" />
                            <label className='text-lg font-bold'>Description</label>
                            <textarea name="description" value={formData.description || ""} onChange={handleChange} className="w-full border px-1 rounded" placeholder="Deskripsi" />
                            <label className='text-lg font-bold'>Ingredients</label>
                            <textarea name="ingredients" value={formData.ingredients || ""} onChange={handleChange} className="w-full h-40 border px-1 rounded" placeholder="Bahan" />
                            <label className='text-lg font-bold'>Steps</label>
                            <textarea name="steps" value={formData.steps || ""} onChange={handleChange} className="w-full h-40 border px-1 rounded" placeholder="Langkah-langkah" />
                        </form>
                        <div onSubmit={handleSubmit} className="flex justify-end gap-2 pt-10">
                            <button type="button" onClick={onClose} className="bg-orange-200 hover:bg-orange-300 transition duration-100 font-bold  w-1/2 px-3 py-1 rounded-lg">Cancel</button>
                            <button type="submit" onClick={handleSubmit} className="bg-orange-200 hover:bg-orange-300 transition duration-100 font-bold  px-3 w-1/2 py-1 rounded-lg border-gray">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditRecipe