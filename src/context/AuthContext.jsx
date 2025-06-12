import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null
    })

    useEffect(() => {
        const token = localStorage.getItem('token')
        const userData = localStorage.getItem('user')
        const expiry = localStorage.getItem('sessionExpiry')
        if (token && userData && expiry) {
            const isExpired = new Date() > new Date(expiry)
            if (!isExpired) {
                setAuthState({ isAuthenticated: true, user: JSON.parse(userData) })
            } else {
                logout()
            }
        } else {
            logout()
        }
    }, [])

    const login = (token, user) => {
        const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours/ 1 day
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('sessionExpiry', expiry.toISOString())
        setAuthState({ isAuthenticated: true, user })
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('sessionExpiry')
        setAuthState({ isAuthenticated: false, user: null })
    }

    return (
        <AuthContext.Provider value={{ ...authState, setAuthState, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)