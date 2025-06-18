import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { MdDns, MdBookmarkAdded } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { FiLogOut, FiLogIn } from "react-icons/fi";

const Modals = ({ onClose }) => {
    const navigate = useNavigate()
    const { isAuthenticated, user, logout } = useAuth()

    useEffect(() => {
        const sessionExpiry = localStorage.getItem('sessionExpiry')
        if (sessionExpiry && new Date() > new Date(sessionExpiry)) {
            logout()
        }
    })

    return (
        <div onClick={onClose} className='fixed h-screen w-full inset-0  flex z-50'>
            <div className='bg-white rounded-md p-1 w-60 md:w-80 h-screen fixed right-0 '>
                <button onClick={onClose} className="text-orange-300 mb-6 mt-2 ml-2 font-bold float-left">x</button>
                {!isAuthenticated ? (
                    <div className='flex flex-col text-left pt-6'>
                        <button onClick={() => { navigate('/register'); onClose() }} className='text-left border-b border-gray-400 text-gray-400 hover:text-black transition duration-100 py-3'><span className='flex items-center gap-2'>
                            <FaUserPlus className='text-3xl' /> Register
                        </span>
                        </button>
                        <button onClick={() => { navigate('/login'); onClose() }} className='text-left border-b border-gray-400 text-gray-400 hover:text-black transition duration-100 py-3'><span className='flex items-center gap-2'>
                            <FiLogIn className='text-3xl' />
                            Login
                        </span>
                        </button>
                    </div>
                ) : (
                    <div className='flex text-left flex-col gap-2'>
                        <h2 className='text-center mt-6 py-3 border-b border-gray-400 '> Hai , {user?.username}</h2>
                        <button onClick={() => { navigate('/admin'); onClose() }} className='text-left text-gray-600 hover:text-black transition duration-100 py-3 border-b border-gray-400 '><span className='flex items-center gap-2'>
                            <MdDns className='text-3xl' />Dashboard
                        </span>
                        </button>
                        <button onClick={() => navigate('/saved')} className='text-left text-gray-600 hover:text-black transition duration-100 py-3 border-b border-gray-400 ' ><span className='flex items-center gap-2'>
                            <MdBookmarkAdded className='text-3xl' />
                            Saved
                        </span>
                        </button>
                        <button onClick={() => { navigate('/'); logout(); onClose() }} className='text-left text-gray-600 hover:text-black transition duration-100 py-3 border-b border-gray-400  ' ><span className='flex items-center gap-2'>
                            <FiLogOut className='text-3xl' />
                            Log Out
                        </span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Modals
