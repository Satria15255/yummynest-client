import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className='flex flex-col justify-center items-center py-12 bg-gray-100'>
                <div className='flex justify-center gap-10 items-center'>
                    <h1 className='text-lg font-bold'>Yummy<span className='text-orange-400'>Nest.</span></h1>
                </div>
                <div className='flex justify-center gap-4 md:gap-8 mt-5 text-xs md:text-lg lg:text-xl font-semibold'>
                    <NavLink as={NavLink} to='/' className='hover:text-orange-400 transition duration-100'>Home</NavLink>
                    <NavLink as={NavLink} to='/recipe' className='hover:text-orange-400 transition duration-100'>Recipe</NavLink>
                    <NavLink as={NavLink} to='/' className='hover:text-orange-400 transition duration-100'>Latest Recipe</NavLink>
                    <NavLink as={NavLink} to='/' className='hover:text-orange-400 transition duration-100'>Populare Recipe</NavLink>
                </div>
            </div>
            <div className="text-xs md:text-sm text-gray-500 text-center bg-gray-100 py-2 border-t border-gray-300">&copy; 2025 YummyNest. All rights reserved.</div>

        </>
    )
}

export default Footer