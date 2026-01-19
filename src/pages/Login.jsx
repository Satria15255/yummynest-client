import React, { useState } from 'react'
import { loginUser } from '../service/user.service'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' })
    const navigate = useNavigate()
    const { login } = useAuth()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await loginUser(form)
            if (res.status === 200) {
                const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
                localStorage.setItem('sessionExpiry', expiryDate.toISOString())
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('userId', res.data.user.id)
                login(res.data.token, res.data.user)
                toast.success('Login Success!!')
                navigate('/')
            }
        } catch (err) {
            toast.error('Login Failed')
            console.error(err)
        }
    }

    return (
        <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 border border-gray-400 shadow-xl md:w-4/5 lg:w-2/5">
                <p onClick={() => navigate('/')} className='float-right font-bold'>X</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-5">
                    <h2 className="text-xl font-bold mb-3 text-center">Login</h2>
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border rounded p-2" />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border rounded p-2" />
                    <button type="submit" className="bg-orange-200 font-bold py-2 rounded">Login</button>
                    <p className='text-center text-md mt-4 '>Don't have an account?</p>
                    <p onClick={() => navigate('/register')} className='text-sm text-orange-400 cursor-pointer text-center'>Create Account</p>
                </form>
            </div>
        </div >
    )
}

export default Login