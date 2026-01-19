import React from 'react'
import { PiUserCircleDuotone, PiStarFill, PiStarHalfFill } from "react-icons/pi";

const testimonial = [
    {
        name: "Andi Saputra",
        text: "Very friendly service, clean rooms, and a very comfortable atmosphere. Recommended!",
        date: "1 years ago",
    },
    {
        name: "Rina Oktavia",
        text: "The hotel design is modern, the facilities are complete, and the breakfast is delicious!",
        date: "2 years ago",
    },
    {
        name: "Budi Hartono",
        text: "I really enjoyed my stay here. I will definitely come back again!",
        date: "4 years ago",
    },
    {
        name: "Lisa Adelia",
        text: "Strategic location, close to the city center, suitable for vacations and business.",
        date: "1 mounth ago",
    },
    {
        name: "Andi Saputra",
        text: "Very friendly service, clean rooms, and a very comfortable atmosphere. Recommended!",
        date: "1 years ago",
    },
    {
        name: "Rina Oktavia",
        text: "The hotel design is modern, the facilities are complete, and the breakfast is delicious!",
        date: "2 years ago",
    },
    {
        name: "Budi Hartono",
        text: "I really enjoyed my stay here. I will definitely come back again!",
        date: "4 years ago",
    },
    {
        name: "Lisa Adelia",
        text: "Strategic location, close to the city center, suitable for vacations and business.",
        date: "1 mounth ago",
    },
]

const Testimoni = () => {
    return (
        <div className='h-auto lg:h-screen border flex flex-col justify-center border-yellow-300 p-5 py-6'>
            <div>
                <p className='text-xl md:text-2xl lg:text-3xl font-bold text-center '>Testimonial</p>
                <p className='text-[10px] md:text-sm lg:text-sm font-sans text-[#FFD700] text-center md:p-6'>We are trusted by more than 1000+ customers</p>
            </div>
            <div className='w-full max-w-8xl overflow-x-auto scrollbar-hide'>
                <div className='flex gap-6 py-6'>
                    {testimonial.map((t, index) => (
                        <div key={index} className='min-w-[250px] md:min-w-[400px] max-w-lg h-40 md:h-60 flex flex-col justify-between p-5 shadow-lg border border-gray-100 rounded-3xl'>
                            <div className='flex justify-between'>
                                <PiUserCircleDuotone size={40} />
                                <p className='text-[9px] md:text-sm'>{t.date}</p>
                            </div>
                            <div>
                                <p className='text-[9px] md:text-sm'>{t.text}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-[9px] md:text-sm'>{t.name}</p>
                                <div className='flex text-sm text-yellow-500'>
                                    <PiStarFill />
                                    <PiStarFill />
                                    <PiStarFill />
                                    <PiStarFill />
                                    <PiStarFill />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Testimoni