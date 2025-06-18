import React, { useState } from 'react'
import axios from '../api/axiosInstance'
import { toast } from 'react-toastify'


const UploadModal = ({ onClose, fetchRecipes }) => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        ingredients: '',
        steps: '',
        image: null
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleImageChange = (e) => {
        setForm({ ...form, image: e.target.files[0] })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', form.title)
        formData.append('description', form.description)
        formData.append('ingredients', JSON.stringify(form.ingredients.split(',')))//array
        formData.append('steps', JSON.stringify(form.steps.split(',')))
        formData.append('image', form.image)

        try {
            await axios.post('/recipes/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            toast.success('Berhasil upload resep!')
            onClose() // Close the modal after successful upload
            fetchRecipes() // Assuming you have a function to refresh the recipe list
        } catch (err) {
            console.error(err)
            toast.error('Gagal upload resep', err.message)
        }
    }

    return (
        <div className='fixed inset-0 bg-black/40  flex justify-center items-center z-50'>
            <div className='bg-white w-4/5 h-90% rounded-xl overflow-y-auto max-h-[100vh] relative'>
                <form className="flex flex-col gap-2 p-5 z-50  justify-center inset-0">
                    <label className='text-lg font-bold'>Food Name</label>
                    <input type="text" name="title" placeholder='Nama Resep' className="border px-2 py-1 rounded-lg border-gray-500" onChange={handleChange} />
                    <label className='text-lg font-bold'>Description</label>
                    <textarea name="description" placeholder='Deskripsi' className="border px-2 pb-7 rounded-lg border-gray-500" onChange={handleChange} />
                    <label className='text-lg font-bold'>Tools & Materials</label>
                    <textarea type="text" name="ingredients" placeholder='Bahan-bahan' className="border px-2 pb-7 rounded-lg border-gray-500" onChange={handleChange} />
                    <label className='text-lg font-bold'>Steps</label>
                    <textarea name="steps" placeholder='Langkah-langkah' className="border px-2 pb-7 rounded-lg border-gray-500" onChange={handleChange} />
                    <label className='text-lg font-bold'>Picture</label>
                    <input type="file" name="image" accept="image/*" className="border py-1 px-2 rounded-lg border-gray-500" onChange={handleImageChange} />
                    <div className='flex gap-2 '>
                        <button type='button' className='bg-orange-200 px-5 w-1/2 py-2 rounded-lg mt-2 hover:bg-orange-300 transition duration-200 font-bold' onClick={onClose}>Cancel</button>
                        <button type='submit' className='bg-orange-200 px-5 w-1/2 py-2 rounded-lg mt-2 hover:bg-orange-300 transition duration-200 font-bold' onClick={handleSubmit}>Upload Resep</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UploadModal