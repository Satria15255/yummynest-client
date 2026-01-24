import React from 'react'
import { NavLink } from 'react-router-dom'

const MobileRoutes = ({ onClose }) => {
    return (
        <div onClick={onClose} className='h-screen z-100 inset-0 bg-black/30 fixed '>
            <div className='bg-white h-screen w-50 fixed right-0'>
                <div className='py-8 px-2'>
                    <h1 className='text-2xl font-bold'>Yummy<span className='text-orange-300'>Nest.</span></h1>
                </div>
                <div className='flex flex-col'>
                    <NavLink as={NavLink} to='/' className='text-lg font-semibold border-b px-2 py-4 hover:text-orange-300'>Home</NavLink>
                    <NavLink as={NavLink} to='/' className='text-lg font-semibold border-b px-2 py-4 hover:text-orange-300'>About</NavLink>
                    <NavLink as={NavLink} to='/recipe' className='text-lg font-semibold border-b px-2 py-4 hover:text-orange-300'>Recipe</NavLink>
                    <NavLink as={NavLink} to='/' className='text-lg font-semibold border-b px-2 py-4 hover:text-orange-300'>Contact</NavLink>
                    <NavLink as={NavLink} to='/' className='text-lg font-semibold border-b px-2 py-4 hover:text-orange-300'>Blog</NavLink>
                </div>
            </div>
        </div>
    )
}

export default MobileRoutes