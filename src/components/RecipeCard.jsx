import React from 'react'
import { useNavigate } from 'react-router-dom';
import { LuBookmark, LuBookmarkCheck, LuMessagesSquare } from "react-icons/lu";
import { PiHeartStraightFill } from "react-icons/pi";
import { MdStar } from "react-icons/md";

const RecipeCardAdmin = ({ recipe, onSave, unSave, saved, handleLike, isLiked, likesCount, commentsCount }) => {
    const navigate = useNavigate()

    return (
        <section className="flex flex-col shadow-lg w-auto h-auto md:w-[60vh] md:h-[75vh] rounded-xl justify-between px-1 my-2 hover:shadow-2xl transition duration-200 bg-white">
            <header onClick={() => navigate(`/recipes/${recipe._id}`)}>
                <img src={recipe.image} alt={recipe.title} className='w-full h-40 md:h-60 object-cover object-center rounded-xl p-1' />
                <div className='p-3 flex flex-col justify-center'>
                    <div className='flex flex-col md:flex-row justify-between '>
                        <div className='flex text-yellow-500'>
                            <MdStar />
                            <MdStar />
                            <MdStar />
                            <MdStar />
                            <MdStar />
                        </div>
                        <p className='text-xs font-semibold text-grey-200'>3.5K Review</p>
                    </div>
                    <h2 className='h-7 font-bold text-xs md:text-xl mt-2'>{recipe.title}</h2>
                    <p className='hidden md:flex text-xs text-gray-500 mt-2 max-w-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nobis eos, minus sequi autem quasi culpa nostrum doloremque non eius quo!</p>
                </div>
            </header>
            <footer className='flex justify-around items-center border-t border-gray-200 py-6 px-2'>
                <button onClick={handleLike} className={`text-sm flex items-center ${isLiked ? 'text-red-500' : 'text-gray-500'}`}>
                    {isLiked ? <PiHeartStraightFill /> : <PiHeartStraightFill />} {likesCount}
                </button>
                <button className='flex items-center gap-2'><LuMessagesSquare size={15} />{commentsCount}</button>
                <button
                    onClick={saved ? () => unSave(recipe._id) : () => onSave(recipe._id)}
                    className={`${saved ? 'hover:bg-gray-300 transition duration-100' : ' hover:bg-white duration-100'}`}
                >
                    {saved ? <LuBookmarkCheck size={20} /> : <LuBookmark size={15} />}
                </button>
            </footer>
        </section>
    )
}

export default RecipeCardAdmin