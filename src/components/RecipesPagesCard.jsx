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
            <div className='relative z-10 bg-white w-4/5 md:w-4/5 lg:w-3/5 shadow-xl rounded-xl mt-16 mb-16 p-2 md:p-5'>
                <p className='text-sm'><NavLink as={NavLink} to="/" className="hover:text-orange-300 transition duration-50 font-bold">Home</NavLink> / {recipe.title}</p>
                <div className='grid grid-cols-1 md:grid-cols-2 border-b border-gray-200 pb-4'>
                    <div className='p-3 w-full lg:w-1/2'>
                        <img
                            loading='lazy'
                            src={recipe.image}
                            alt={recipe.title}
                            className='w-full mb-4 z-20 rounded-xl'
                        />
                        <div className='flex flex-col justify-between text-sm '>
                            <div className=' justify-between '>
                                <p className="text-sm lg:text-xl font-bold">@{recipe.user?.username || "Anonim"}</p>
                                <p className='text-sm lg:text-lg text-gray-500'>Posted on : {new Date(recipe.createdAt).toLocaleDateString()}</p>
                            </div>
                            <h1 className='text-lg lg:text-3xl font-bold mb-4 mt-2'>{recipe.title}</h1>
                            <p className='text-sm lg:text-lg text-gray-700 max-w-lg mb-4'>{recipe.description}</p>
                        </div>
                        <div className='hidden md:flex overflow-y-auto max-h-[60vh]'>
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
                    <div className='p-3 lg:w-1/2'>
                        <h2 className='text-lg lg:text-2xl font-semibold mb-2'>Ingredients</h2>
                        <ul className='list-disc text-sm lg:text-lg pl-5 mb-4  lg:max-w-lg'>
                            {recipe.ingredients?.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        <h2 className='text-lg lg:text-2xl font-semibold mb-2'>Instructions</h2>
                        <ul className='text-sm lg:text-lg max-w-lg'>
                            {recipe.steps?.map((step, index) => (
                                <li key={index} className='mb-2'>{index + 1}. {step}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='flex justify-end items-center py-2'>
                        <button
                            onClick={saved ? () => onUnsave(recipe._id) : onSave}
                            className={`${saved ? 'bg-gray-400' : 'bg-orange-200'} font-bold rounded-xl w-2/5 text-xs text-center md:w-1/5 py-2`}
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
                    <div className='flex md:hidden p-4  overflow-y-auto max-h-[60vh]'>
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
            </div>
        </div>
    )
}

export default React.memo(RecipePagesCard)
