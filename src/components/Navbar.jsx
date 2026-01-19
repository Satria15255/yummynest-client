import React, { useEffect, useState } from 'react'
import { FaUserCircle, FaBars } from "react-icons/fa";
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import Modals from './Modals';
import MobileMenu from './MobileRoutes'

const Navbar = () => {
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const { isAuthenticated, user } = useAuth()

    return (
        <section className=' flex justify-between px-4 font-bold rounded-b-xl bg-white z-50 h-14 items-center inset-0 fixed top-0'>
            <div>
                <h1 className='md:text-xl lg:text-xl font-bold'>Yummy<span className='text-orange-300'>Nest.</span></h1>
            </div>
            <div className='hidden md:flex gap-3 items-center'>
                <div className='flex  md:flex gap-3'>
                    <NavLink as={NavLink} to='/' className='text-sm md:text-lg font-semibold hover:text-orange-300'>Home</NavLink>
                    <NavLink as={NavLink} to='/recipe' className='text-sm md:text-lg font-semibold hover:text-orange-300'>About</NavLink>
                    <NavLink as={NavLink} to='/recipe' className='text-sm md:text-lg font-semibold hover:text-orange-300'>Recipe</NavLink>
                    <NavLink as={NavLink} to='/recipe' className='text-sm md:text-lg font-semibold hover:text-orange-300'>Blog</NavLink>
                </div>
            </div>
            <div className='flex gap-4 items-center'>
                <button onClick={() => setShowModal(true)} className='hover:text-orange-300 text-2xl md:text-3xl '><FaUserCircle /></button>
                <button onClick={() => setIsMobile(!isMobile)} className='md:hidden hover:text-orange-300 text-2xl '>
                    <FaBars />
                </button>
            </div>
            {isMobile && <MobileMenu onClose={() => setIsMobile(false)} />}
            {showModal && <Modals onClose={() => setShowModal(false)} isAuthenticated={isAuthenticated} user={user} />}
        </section>
    )
}

export default Navbar