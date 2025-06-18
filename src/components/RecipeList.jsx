import React from 'react'
import { Link } from 'react-router-dom';

const RecipeCardAdmin = ({ recipe, onSave, unSave, saved }) => {
    return (
        <div className="flex flex-col shadow-xl  h-full  rounded-xl justify-center py-1">
            <img src={recipe.image} alt={recipe.title} className='w-full rounded-xl p-1' />
            <div className='flex flex-col justify-between flex-1 '>
                <div className='p-3 flex flex-col justify-center text-center'>
                    <h2 className='font-bold text-sm md:text-xl mt-2'>{recipe.title}</h2>
                    <p className='hidden md:flex text-xs text-gray-500 mt-2 max-w-lg'>{recipe.description}</p>
                </div>
                <div className='p-1 text-xs md:text-lg '>
                    <Link to={`/recipes/${recipe._id}`} className='bg-black text-white flex justify-center p-3 font-bold px-4 hover:bg-white hover:text-black border border-gray-400  rounded-xl '>
                        See recipe
                </Link>
                    <button
                        onClick={saved ? () => unSave(recipe._id) : () => onSave(recipe._id)}
                        className={`${saved ? 'bg-gray-200  hover:bg-gray-300 transition duration-100' : 'bg-orange-200 hover:bg-orange-300 transition duration-100'} font-bold mt-1 rounded-xl w-full p-3`}
                    >
                        {saved ? 'Unsave Recipe' : 'Save Recipe'}
                </button>
                </div>
            </div>
        </div>
    )
}

export default RecipeCardAdmin