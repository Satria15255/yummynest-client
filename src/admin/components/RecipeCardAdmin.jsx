import React from 'react'
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const RecipeCardAdmin = ({ recipe, onDelete, onEdit }) => {
    return (
        <div className="flex justify-between py-2 items-center">
            <div className='flex items-center gap-3'>
                <img src={recipe.image} alt="" className='w-10 md:w-20 rounded-xl' />
                <div className=''>
                    <h2 className='font-bold text-xs md:text-lg lg:text-2xl'>{recipe.title}</h2>
                    <p className='text-gray-500 max-w-xl hidden md:flex md:text-xs lg:text-sm'>{recipe.description}</p>
                </div>
            </div>
            <div className='flex' >
                <button className='bg-black hover:bg-gray-300 hover:text-black transition duration-100  text-white text-xs md:text-lg lg:text-xl p-2 md:px-4 md:py-3 lg:px-6 lg:py-4 rounded mr-2'
                    onClick={() => onDelete(recipe._id)}>
                    <FaTrashAlt />
                </button>
                <button className='bg-gray-300 hover:bg-orange-300  transition duration-100 text-xs md:text-lg p-2 lg:text-xl md:py-3  md:px-4 lg:py-4 lg:px-6  rounded'
                    onClick={onEdit}>
                    <FaEdit />
                </button>
            </div>
        </div>
    )
}

export default RecipeCardAdmin