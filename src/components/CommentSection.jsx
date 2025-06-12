import React from 'react'

const CommentSection = ({ comments, userId, onDelete }) => {
    return (
        <div className='flex flex-col'>
            <label className='text-lg font-bold mb-2'>Comment</label>
            <div className='overflow-y-auto max-h-[40vh]'>
                {comments.map((comment, index) => (
                    <div key={index} className='bg-gray-100 p-2 rounded-lg mt-2'>
                        <p className='text-sm font-semibold'>{comment.user?.username || 'Unknown User'}</p>
                        <p className='text-sm'>{comment.text}</p>
                        <p className='text-xs text-gray-500'>{new Date(comment.createdAt).toLocaleDateString()}</p>
                        {(comment.user._id === userId || comment.user === userId) && (
                            <button onClick={() => onDelete(comment._id)} className='text-red-500 text-xs mt-1'>
                                Delete
                            </button>
                        )}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default React.memo(CommentSection)
