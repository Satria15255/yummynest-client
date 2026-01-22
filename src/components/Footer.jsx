import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { LuInstagram } from "react-icons/lu";
import { FaFacebookSquare, FaWhatsapp, FaTwitter } from "react-icons/fa";

const socialMedia = [
    {
        id: 1,
        icon: <LuInstagram />,
        media: 'Instagram',
        userName: '@yummynest'
    },
    {
        id: 2,
        icon: <FaFacebookSquare />,
        media: 'FaceBook',
        userName: '@yumyynest_community'
    },
    {
        id: 3,
        icon: <FaTwitter />,
        media: 'Twitter',
        userName: '@yummynest'
    },
    {
        id: 4,
        icon: <FaWhatsapp />,
        media: 'WhatsApp Chanel',
        userName: 'yummynest.cook'
    }
]

const Footer = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className='flex flex-col md:flex-row md:justify-between md:items-center space-y-5 px-2 md:px-6 py-12 bg-gray-100'>
                <div className='space-y-3'>
                    <h1 className='text-2xl lg:text-4xl font-bold'>Yummy<span className='text-orange-400'>Nest.</span></h1>
                    <p className="text-sm md:text-sm md:max-w-xs">A warm space for cooking enthusiasts to share recipes, stories, and inspiration. From home cooking to your best creations, every dish has a story worth sharing.</p>
                </div>
                <div className='flex flex-col md:justify-center space-y-4 text-sm lg:text-lg font-semibold'>
                    <NavLink as={NavLink} to='/' className='hover:text-orange-400 transition duration-100'>Home</NavLink>
                    <NavLink as={NavLink} to='/' className='hover:text-orange-400 transition duration-100'>About</NavLink>
                    <NavLink as={NavLink} to='/' className='hover:text-orange-400 transition duration-100'>Recipe</NavLink>
                    <NavLink as={NavLink} to='/' className='hover:text-orange-400 transition duration-100'>Blog</NavLink>
                    <NavLink as={NavLink} to='/' className='hover:text-orange-400 transition duration-100'>Contact</NavLink>
                </div>
                <div>
                    {socialMedia.map((social) => (
                        <div key={social.id}>
                            <p className='flex items-center gap-2 mt-4 font-semibold text-sm lg:text-lg hover:text-orange-300 transition duration-100 cursor-pointer'><span className="text-xl">{social.icon}</span>{social.userName}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="text-[10px] md:text-sm text-gray-500 text-center bg-gray-100 py-2 border-t border-gray-300">&copy; 2025 YummyNest. All rights reserved.</div>

        </>
    )
}

export default Footer