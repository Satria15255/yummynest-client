import React, { useState, useEffect } from 'react';
import RecipeCardAdmin from './components/RecipeCardAdmin';
import { myRecipes, deleteRecipe } from '../service/recipe.service'
import ConfirmDeleteToast from './components/ConfirmDeleteToast';
import EditModals from './EditRecipe'
import UploadModal from './AddRecipe'
import { toast } from 'react-toastify'


const AdminDashboard = () => {
    const [recipes, setRecipes] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [selectedRecipe, setSelectedRecipe] = useState(null)

    // GET resep user
    const fetchRecipes = async () => {
        try {
            const res = await myRecipes()
            console.log('res.data', res.data)
            setRecipes(res.data)
        } catch (err) {
            console.error("Gagal mengambil data resep", err)
        }
    }

    useEffect(() => {
        fetchRecipes()
    }, [])

    // DELETE resep user
    const handleDelete = (id) => {
        toast(
            ({ closeToast }) => (
                <ConfirmDeleteToast
                    onCancel={closeToast}
                    onConfirm={async () => {

                        await deleteRecipe(id)
                        setRecipes(recipes.filter((r) => r._id !== id))
                        toast.success('Resep berhasil dihapus')
                        fetchRecipes()
                        closeToast()
                    }}
                />
            )
        ),
        {
            autoClose: false,
            closeOnClick: false,
            closeButton: false

        }
    }

    // OPEN edit modals
    const handleEdit = (recipe) => {
        setSelectedRecipe(recipe)
        setEditModalOpen(true)
    }

    return (
        <div className='p-5 h-screen overflow-y-auto'>
            <h1 className='text-3xl font-bold mb-6'>Admin Dashboard</h1>
            <div className='flex justify-between border-b py-2'>
                <p className=' text-xs md:text-2xl flex items-center font-bold text-gray-500'>Postingan</p>
                <button onClick={() => setShowModal(true)} className='flex bg-orange-200 hover:bg-orange-300 transition duration-100 px-4 p-2 font-bold text-xs md:text-lg rounded-xl'>Upload</button>
                {showModal && <UploadModal fetchRecipes={() => fetchRecipes()} onClose={() => setShowModal(false)} />}
            </div>
            <div className='w-full gap-4'>
                {recipes.length === 0 ? (
                    <p className='text-gray-500 text-lg mt-4'>Tidak ada resep yang ditemukan.</p>
                ) : (
                    recipes.map(recipe => (
                        <RecipeCardAdmin
                            key={recipe._id}
                            recipe={recipe}
                            onDelete={() => { handleDelete(recipe._id) }}
                            onEdit={() => handleEdit(recipe)}
                        />
                    ))
                )}
                {editModalOpen && (<EditModals isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} recipe={selectedRecipe} onUpdated={fetchRecipes} />)}
            </div>
        </div>
    )
}

export default AdminDashboard;