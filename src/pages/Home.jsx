import React from 'react'
import homeImage from '../assets/background.png'

const Home = () => {
    return (
        <div className='h-auto z-0  relative'>
            <img src={homeImage} alt="" className='object-cover aspect[18:9]' />
            <div className='bg-black/40 absolute inset-0'></div>
            <div className='absolute inset-0 bg-opacity-50 flex items-center p-4'>
                <div>
                    <p className='py-4 text-6xl font-bold text-white'>Find Your <span className='text-orange-200'>Favorite Recipe</span></p>
                    <div className='relative flex'>
                        <input type="search" placeholder="Search" className='absolute pr-25 text-2xl p-4 bg-white rounded-full' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home