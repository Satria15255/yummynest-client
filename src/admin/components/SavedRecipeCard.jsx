import React from 'react'
import { FaEdit, FaTrashAlt } from "react-icons/fa";


const SavedRecipeCard = ({ recipe, onUnSave }) => {
    return (
        <div className="flex justify-between py-2 items-center">
            <div className='flex items-center gap-3'>
                <img src={`https://yummynest-api.onrender.com/uploads/${recipe.image}`} alt="" className='w-20 rounded-xl' />
                <div className=''>
                    <h2 className='font-bold text-2xl'>{recipe.title}</h2>
                    <p className='text-gray-500 max-w-xl text-sm'>{recipe.description}</p>
                </div>
            </div>
            <div>
                <button className='bg-orange-300 hover:bg-orange-400 transition duration-100 text-white px-6 py-4 rounded mr-2'
                    onClick={() => onUnSave(recipe._id)}>
                    <FaTrashAlt />
                </button>

            </div>
        </div>
    )
}

export default SavedRecipeCard