import React from 'react'

const RecipeCardAdmin = ({ recipe, onDelete, onEdit }) => {
    return (
        <div className="flex justify-between py-2 items-center">
            <div className='flex items-center gap-3'>
                <img src={`http://localhost:5000/uploads/${recipe.image}`} alt="" className='w-20 rounded-xl' />
                <div className=''>
                    <h2 className='font-bold text-2xl'>{recipe.title}</h2>
                    <p className='text-gray-500 max-w-xl text-sm'>{recipe.description}</p>
                </div>
            </div>
            <div>
                <button className='bg-blue-500 text-white px-4 py-2 rounded mr-2'
                    onClick={() => onDelete(recipe._id)}>
                    Hapus
                </button>
                <button className='bg-yellow-500 text-white px-6 py-2 rounded'
                    onClick={onEdit}>
                    Edit
                </button>
            </div>
        </div>
    )
}

export default RecipeCardAdmin