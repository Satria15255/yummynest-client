import React from 'react'
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const RecipeCardAdmin = ({ recipe, onDelete, onEdit }) => {
    return (
        <div className="flex justify-between py-2 items-center">
            <div className='flex items-center gap-3'>
                <img src={`https://yummynest-backend.onrender.com/uploads/${recipe.image}`} alt="" className='w-20 rounded-xl' />
                <div className=''>
                    <h2 className='font-bold text-2xl'>{recipe.title}</h2>
                    <p className='text-gray-500 max-w-xl text-sm'>{recipe.description}</p>
                </div>
            </div>
            <div>
                <button className='bg-black hover:bg-gray-300 hover:text-black transition duration-100  text-white text-xl px-6 py-4 rounded mr-2'
                    onClick={() => onDelete(recipe._id)}>
                    <FaTrashAlt />
                </button>
                <button className='bg-gray-300 hover:bg-orange-300  transition duration-100 text-xl py-4 px-6  rounded'
                    onClick={onEdit}>
                    <FaEdit />
                </button>
            </div>
        </div>
    )
}

export default RecipeCardAdmin