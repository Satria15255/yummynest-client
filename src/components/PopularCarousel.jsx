import React, { useRef } from 'react'
import AutoPlay from 'embla-carousel-autoplay'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import RecipeCard from './RecipeCard'

const PopularCarousel = ({ recipe, onSave, unSave, saved, handleLike, isLiked, likesCount, commentsCount }) => {
    const plugin = useRef(
        AutoPlay({ delay: 3000, stopOnInteraction: true })
    )
    return (
        <Carousel
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {recipe.map((r) => (
                    <CarouselItem key={r._id}>
                        <RecipeCard
                            recipe={r}
                            onSave={onSave}
                            unSave={unSave}
                            saved={saved}
                            handleLike={handleLike}
                            isLiked={isLiked}
                            likesCount={likesCount}
                            commentsCount={commentsCount}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>

        </Carousel>
    )
}

export default PopularCarousel