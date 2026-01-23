import React from 'react'

const Home = () => {
    return (
        <section >
            <div className='w-full h-screen bg-cover bg-center overflow-hidden z-0' style={{ backgroundImage: `url(/image/hero.jpg)` }}>
                <div className='absolute h-screen inset-0 bg-opacity-50 flex flex-col justify-center mt-10 p-2 md:p-4 space-y-3 md:space-y-5'>
                    <h2 className='md:text-left text-4xl md:text-5xl lg:text-7xl max-w-2xl font-bold'>Find Your <span className='text-yellow-400'>Favorite</span> Recipes <span className='text-yellow-400'>Here</span></h2>
                    <p className="text-sm md:text-sm md:max-w-xl">A warm space for cooking enthusiasts to share recipes, stories, and inspiration. From home cooking to your best creations, every dish has a story worth sharing. Discover, share, and celebrate flavors with a community that loves food as much as you do.</p>
                    <button className="h-10 px-6 bg-yellow-300 w-1/2 md:w-1/5 rounded-lg">Explore →</button>
                </div>
            </div>
        </section>
    )
}

export default Home