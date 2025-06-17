import React from 'react'
import CommentSection from './CommentSection'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'


const RecipePagesCard = ({
    recipe,
    saved,
    commentText,
    onCommentChange,
    onCommentSubmit,
    onDeleteComment,
    onSave,
    onUnsave,
    userId
}) => {

    const navigate = useNavigate()
    return (
        <div className='relative flex mt-16 bg-cover h-full items-center justify-center' style={{ backgroundImage: `url('/menu/background2.jpg')` }} >
            <div className='absolute inset-0 bg-black/50 z-0'></div>
            <div className='relative z-10 bg-white w-3/5 shadow-xl rounded-xl mt-16 mb-16 p-5'>
                <p className='text-sm'><NavLink as={NavLink} to="/" className="hover:text-orange-300 transition duration-50 font-bold">Home</NavLink> / {recipe.title}</p>
                <div className='flex border-b border-gray-200 pb-4'>
                    <div className='p-3 w-1/2'>
                        <img
                            loading='lazy'
                            src={`https://yummynest-api.onrender.com/uploads/${recipe.image}`}
                            alt={recipe.title}
                            className='w-full mb-4 z-20 rounded-xl'
                        />
                        <div className='flex flex-col justify-between text-sm '>
                            <div className=' justify-between '>
                                <p className="text-xl font-bold">@{recipe.user?.username || "Anonim"}</p>
                                <p className='text-gray-500'>Posted on : {new Date(recipe.createdAt).toLocaleDateString()}</p>
                            </div>
                            <h1 className='text-3xl font-bold mb-4 mt-2'>{recipe.title}</h1>
                            <p className='text-lg text-gray-700 max-w-lg mb-4'>{recipe.description}</p>
                        </div>
                        <div className='overflow-y-auto max-h-[60vh]'>
                            <CommentSection
                                comments={recipe.comments || []}
                                userId={userId}
                                onDelete={onDeleteComment}
                                value={commentText}
                                onChange={onCommentChange}
                                onSubmit={onCommentSubmit}
                            />
                        </div>
                    </div>
                    <div className='p-3 w-1/2'>
                        <h2 className='text-2xl font-semibold mb-2'>Ingredients</h2>
                        <ul className='list-disc pl-5 mb-4 max-w-lg'>
                            {recipe.ingredients?.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        <h2 className='text-2xl font-semibold mb-2'>Instructions</h2>
                        <ul className='max-w-lg'>
                            {recipe.steps?.map((step, index) => (
                                <li key={index} className='mb-2'>{index + 1}. {step}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='flex justify-between items-center py-2'>
                        <label className='text-lg font-bold'>Comment</label>
                        <button
                            onClick={saved ? () => onUnsave(recipe._id) : onSave}
                            className={`${saved ? 'bg-gray-400' : 'bg-orange-200'} font-bold rounded-xl w-1/5 py-2`}
                        >
                            {saved ? 'Unsave' : 'Save'}
                        </button>
                    </div>
                    <textarea
                        value={commentText}
                        onChange={onCommentChange}
                        name='text'
                        placeholder='Leave a comment'
                        className='border p-2 pb-12 rounded-lg border-gray-500 mt-4'
                    />
                    <button onClick={onCommentSubmit} className='bg-orange-200 hover:bg-orange-300 transition duration-100 font-bold px-4 py-2 rounded-lg mt-2'>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(RecipePagesCard)
