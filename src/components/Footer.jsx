import React from 'react'

const Footer = () => {
    return (
        <>
            <div className='flex justify-around py-12 bg-orange-200'>
                <h1 className='text-2xl font-bold'>Recipe.Vite</h1>
                <div className='flex flex-col'>
                    <h1 className='text-2xl font-bold mb-2'>Information</h1>
                    <p>Recipe</p>
                    <p>Recipe</p>
                    <p>Recipe</p>
                    <p>Recipe</p>
                    <p>Recipe</p>
                </div>
                <div className='flex flex-col'>
                    <h1 className='text-2xl font-bold mb-2'>Question</h1>
                    <p>Recipe</p>
                    <p>Recipe</p>
                    <p>Recipe</p>
                    <p>Recipe</p>
                    <p>Recipe</p>
                </div>
            </div>
            <div className="text-xs md:text-sm text-gray-500 text-center bg-orange-200 py-2 border-t border-gray-300">&copy; 2024 Indotamaservice. All rights reserved.</div>

        </>
    )
}

export default Footer