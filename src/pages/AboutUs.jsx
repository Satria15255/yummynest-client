import React from 'react'
import { LuHeartHandshake, LuBookOpenText, LuEarth } from "react-icons/lu";
import aboutImage from '../assets/aboutus.png'
import aboutImage2 from '../assets/aboutus2.png'

const reason = [
    {
        title: "Share Your Recipe ~",
        icon: <LuBookOpenText />,
        description: "Share your favorite recipes, from home-cooked meals to special creations, and let others try your story."
    },
    {
        title: "Discover New Tastes ~",
        icon: <LuEarth />,
        description: "Discover recipes from the community, explore new flavors, and get inspired every day."
    },
    {
        title: "Build a Food Community ~",
        icon: <LuHeartHandshake />,
        description: "More than just recipes — Yummynest is a place to share, interact, and grow with food lovers."
    }
]

const AboutUs = () => {
    return (
        <section className='grid grid-cols-1 md:grid-cols-2 place-items-center p-4 mt-12'>
            <section className='space-y-4 flex flex-col justify-center md:pl-6'>
                <h2 className='text-3xl text-center md:text-left md:text-4xl font-bold font-sans'>Why Yummy<span className='text-orange-300'>Nest ?</span></h2>
                <p className='text-sm'> - A place where food brings people together. - </p>
                <ul className='space-y-5 max-w-xl my-8'>
                    {reason.map((r, index) => (
                        <li key={index}>
                            <h3 className='flex items-center gap-2 text-xl md:text-2xl font-semibold'>
                                <span className=' text-orange-300'>{r.icon}</span>{r.title}</h3>
                            <p className='text-sm'>{r.description}</p>
                        </li>
                    ))}
                </ul>
            </section>
            <aside className='flex justify-center gap-4'>
                <img src={aboutImage} alt='about' className='w-1/2 md:w-2/5 md:h-[60vh] object-cover object-center shadow-lg rounded-xl' />
                <img src={aboutImage2} alt='about' className='w-1/2 md:w-2/5 md:h-[60vh] object-cover object-center mt-12 shadow-xl rounded-xl' />
            </aside>
        </section>
    )
}

export default AboutUs