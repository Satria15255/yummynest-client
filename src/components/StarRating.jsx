import { useState } from "react"

const StarRating = ({ rating, setRating }) => {
    const [hover, setHover] = useState(0)

    return (
        <div>
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`text-4xl cursor-pointer transition ${star <= (hover || rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                            }`}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                    >
                        ★
                    </span>
                ))}
            </div>

            <p className="text-sm text-gray-500 mt-1">
                Rating: {rating || 0} / 5
            </p>
        </div>
    )
}

export default StarRating