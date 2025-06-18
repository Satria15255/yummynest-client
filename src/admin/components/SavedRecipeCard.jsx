import React from 'react'
import { FaEdit, FaTrashAlt } from "react-icons/fa";


const SavedRecipeCard = ({ recipe, onUnSave }) => {
    return (
        <div className="flex justify-between py-2 items-center">
            <div className='flex items-center gap-3'>
                <img src={recipe.image} alt="" className='w-10 md:w-20 rounded-xl' />
                <div className=''>
                    <h2 className='font-bold text-xs md:text-2xl'>{recipe.title}</h2>
                    <p className='text-gray-500 max-w-xl hidden md:flex text-sm'>{recipe.description}</p>
                </div>
            </div>
            <div>
                <button className='bg-gray-500 hover:bg-black transition duration-100 text-xs md:text-lg text-white p-4 md:px-6 md:py-4 rounded mr-2'
                    onClick={() => onUnSave(recipe._id)}>
                    <FaTrashAlt />
                </button>

            </div>
        </div>
    )
}

export default SavedRecipeCard