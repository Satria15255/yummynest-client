import { useState } from "react";
import { LuInstagram } from "react-icons/lu";
import { FaFacebookSquare, FaWhatsapp, FaTwitter } from "react-icons/fa";
import { createTestimonial } from "../service/testimonial.service"
import { toast } from "react-toastify";
import StarRating from "../components/starRating"

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

const Contact = () => {
    const [rating, setRating] = useState(0)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!rating || !message) {
            return toast.error("Please provide your rating and opinion in the message column.")
        }

        try {
            setLoading(true)
            await createTestimonial({ rating, message })
            toast.success("Thank you for your opinion. Have a nice day!!")
            setRating(0)
            setMessage('')
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed send Testimonial")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="grid bg-cover bg-center w-full h-auto place-items-center">
            {/* Contact */}
            <div className="flex flex-col md:flex-row justify-center items-center p-1">
                <div className="w-auto md:w-[70vh] h-[75vh] md:h-[60vh] bg-white rounded-3xl px-7 flex flex-col justify-center my-12 space-y-4 border border-orange-300 rounded">
                    <p className='text-2xl md:text-3xl font-bold'>Join the <span className='text-orange-300'>YummyNest Community</span> here</p>
                    <p className="text-sm max-w-xs">Join the discussion and get the latest information from yummynest by following our community on the following platforms.</p>
                    <div className="">
                        {socialMedia.map((social) => (
                            <div key={social.id} className="flex space-y-4 items-center">
                                <p className='flex items-center gap-2 mt-4 font-bold text-sm md:text-lg hover:text-orange-300 transition duration-100 cursor-pointer'><span className="text-xl">{social.icon}</span>{social.userName}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Message form */}
                <section className="w-auto md:w-[70vh] h-[75vh] md:h-[60vh] bg-white px-7 flex flex-col justify-center space-y-2 rounded">
                    <p className="text-2xl md:text-3xl font-bold">Share Your Opinion <span className="text-orange-300">About Yummynest</span> Here</p>
                    <StarRating rating={rating} setRating={setRating} />
                    <form onSubmit={handleSubmit}>
                        <div className="">
                            <label className="block text-gray-700 font-bold mb-2">Message</label>
                            <textarea value={message} onChange={(e) => setMessage(e.target.value)} id="message" rows={4} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"></textarea>
                        </div>
                        <button type="submit" disabled={loading} className='w-full text-sm md:text-lg bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-lg'>{loading ? 'Sending...' : 'Send Message'}</button>
                    </form>
                </section>
            </div>
        </div>

    )
}

export default Contact