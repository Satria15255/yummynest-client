import React from 'react'
import homeImage from '../assets/background.png'

const Home = () => {
    return (
        <div className='h-auto mt-17  z-0  relative'>
            <div className='w-full aspect-[10/8] md:aspect-[18/6] object-cover object-center overflow-hidden'>
                <img src={homeImage} alt="" className='w-full h-full object-cover object-center' />
            </div>
            <div className='bg-black/40 absolute inset-0'></div>
            <div className='absolute inset-0 bg-opacity-50 flex items-center mb-15 p-4'>
                <div>
                    <p className='py-4 text-4xl text-center md:text-left md:text-5xl lg:text-7xl font-bold text-white'>Find Your <span className='text-orange-200'>Favorite Recipe</span></p>
                    <div className='relative flex'>
                        <input type="search" placeholder="Search" className='absolute w-full md:w-4/5 lg:w-3/5 text-sm md:text-2xl p-4 xl:p-8 xl:mt-4 bg-white rounded-full' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home