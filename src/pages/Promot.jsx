import React from 'react'
import callaction from '../assets/callaction.png'
import { useAuth } from "../context/AuthContext"
import { useNavigate } from 'react-router-dom'

const Promot = () => {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()

    return (
        <section style={{ backgroundImage: `url(${callaction})` }} className='w-full h-[50vh] bg-cover bg-center'>
            <div className='w-full h-[50vh] bg-black/30 flex flex-col justify-center px-6 md:space-y-3'>
                <h1 className='text-2xl md:text-5xl font-semibold text-white'>Have a Favorite Recipe?</h1>
                <h2 className='text-lg md:text-2xl text-white font-semibold'>Find or Share <span className='text-orange-300'>Your Recipe Now!</span></h2>
                {isAuthenticated ? (
                    <button onClick={() => navigate('/recipe')} className='h-10 w-1/2 md:w-1/5bg-orange-300 rounded-full  font-semibold'>Find Now</button>
                ) : (
                    <button onClick={() => navigate('/login')} className='h-10 w-1/2 md:w-1/5 bg-orange-300 rounded-full  font-semibold'>Login Now</button>
                )}
            </div>
        </section>
    )
}

export default Promot