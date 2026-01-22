import { useEffect, useState } from 'react'
import { PiUserCircleDuotone, PiStarFill, PiStarHalfFill } from "react-icons/pi";
import { getTestimonial } from "../service/testimonial.service"

const Testimoni = () => {
    const [testimonials, setTestimonials] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await getTestimonial()
                setTestimonials(res.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchTestimonials()
    }, [])

    if (loading) return <p>wait for minute....</p>
    return (
        <div className='h-auto lg:h-screen border flex flex-col justify-center border-yellow-300 p-5 py-6'>
            <div>
                <p className='text-xl md:text-2xl lg:text-3xl font-bold text-center '>Testimonial</p>
                <p className='text-[10px] md:text-sm lg:text-sm font-sans text-[#FFD700] text-center md:p-6'>We are trusted by more than 1000+ customers</p>
            </div>
            <div className='w-full max-w-8xl overflow-x-auto scrollbar-hide'>
                <div className='flex gap-6 py-6'>
                    {testimonials.map((item, index) => (
                        <div key={index} className='min-w-[250px] md:min-w-[400px] max-w-lg h-40 md:h-60 flex flex-col justify-between p-5 shadow-lg border border-gray-100 rounded-3xl'>
                            <div className='flex justify-between'>
                                <PiUserCircleDuotone size={40} />
                                <p className='text-[9px] md:text-sm'>{new Date(item.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className='text-[9px] md:text-sm'>{item.message}</p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p className='text-[9px] md:text-sm font-semibold'>@{item.user.username}</p>
                                <div className="flex items-center text-yellow-400">
                                    {'★'.repeat(item.rating)}
                                    <span className="text-gray-400">
                                        {'☆'.repeat(5 - item.rating)}
                                    </span>
                                    <span className="text-sm text-gray-600 ml-2">
                                        {item.rating}/5
                                    </span>
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