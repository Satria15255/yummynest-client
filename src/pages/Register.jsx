import React, { useState } from 'react'
import axios from '../api/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'

const Register = ({ isAuthenticated, setIsAuthenticated }) => {
    const [form, setForm] = useState({ username: '', email: '', password: '' })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const { setAuthState } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/auth/register', form)
            toast.success('Registration successful, please re-login with the same email and password!')
            navigate('/login')
        } catch (err) {
            toast.error('Registration failed')
            console.error(err)
        }
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
            <div className='bg-white rounded-xl p-6 w-2/5'>
                <p onClick={() => navigate('/')} className='float-right font-bold'>X</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-5">
                    <h2 className="text-xl font-bold mb-3 text-center">Register</h2>
                    <input type="text" name="username" placeholder="Nama" onChange={handleChange} className="border rounded p-2" />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border rounded p-2" />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border rounded p-2" />
                    <button type="submit" className="bg-orange-200 font-bold py-2 rounded">Register</button>
                    <p className='text-center text-md mt-4 '>Already have an account?</p>
                    <p onClick={() => navigate('/login')} className='text-sm cursor-pointer text-orange-400 text-center'>Login</p>
                </form>
            </div>
        </div>
    )
}

export default Register