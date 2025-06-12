import React, { useEffect, useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import Modals from './Modals';

const Navbar = () => {
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const { isAuthenticated, user } = useAuth()

    return (
        <div className=' flex justify-between p-5 font-bold bg-white border-b border-gray-500  backdrop-blur-md z-50 h-20 items-center inset-0 fixed top-0'>
            <div>
                <h1 className='text-2xl font-bold'>Yummy<span className='text-orange-300'>Nest.</span></h1>
            </div>
            <div className='flex gap-4 text-xl items-center'>
                <NavLink as={NavLink} to='/' className='hover:text-orange-300'>Home</NavLink>
                <NavLink as={NavLink} to='/recipe' className='hover:text-orange-300'>Recipe</NavLink>
                <button onClick={() => setShowModal(true)} className='hover:text-orange-300 text-5xl ml-8'><FaUserCircle /></button>
                {showModal && <Modals onClose={() => setShowModal(false)} isAuthenticated={isAuthenticated} user={user} />}
            </div>
        </div>
    )
}

export default Navbar