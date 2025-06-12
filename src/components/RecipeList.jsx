import React from 'react'
import { FiSearch, FiBookmark } from "react-icons/fi";
import { Link } from 'react-router-dom';

const RecipeCardAdmin = ({ recipe, onSave }) => {
    return (
        <div className="flex flex-col shadow-xl w-4/5 h-auto pb-8 rounded-xl justify-center py-1">
            <div className='flex flex-col items-center gap-3 mb-10'>
                <img src={`http://localhost:5000/uploads/${recipe.image}`} alt="" className='w-full p-1 rounded-3xl' />
                <div>
                    <h2 className='font-bold text-xl'>{recipe.title}</h2>
                </div>
            </div>
            <div className='flex justify-center gap-2'>
                <Link to={`/recipes/${recipe._id}`} className='bg-black text-white text-xl px-4 hover:bg-white hover:text-black border border-gray-400  rounded-full '>
                    <FiSearch />
                </Link>
                <button onClick={() => onSave(recipe._id)} className='bg-black text-white text-xl px-4 hover:bg-white hover:text-black border border-gray-400  rounded-full'>
                    <FiBookmark />
                </button>
            </div>
        </div>
    )
}

export default RecipeCardAdmin