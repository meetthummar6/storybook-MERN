import React from 'react'
import { Link } from 'react-router-dom'

const Story = () => {
    return (
        <div className='w-screen h-screen flex flex-col sm:flex-row gap-10 sm:mx-[8vw] p-10'>
            <img src="/hero.jpg" alt="hero" className='aspect-[9/16] h-1/3 sm:h-[500px] w-[98vw] sm:w-1/3 ring ring-gray-500   object-cover shadow-md bg-transparent' />
            <div className='flex flex-col gap-6 w-full sm:w-2/3 '>
                <div className='text-5xl font-semibold text-blue-800'>
                    Lost in The Storm
                </div>
                <div className='text-xl font-medium text-gray-500'>
                    Kevin Fiege
                </div>
                <div className='text-lg font-medium'>
                    Rating:4.7
                </div>
                <div className='text-xl font-semibold bg-gray-300 py-2 px-4 rounded-md shadow mr-auto text-blue-800'>
                    sci-fi
                </div>
                <div className='text-lg font-medium text-gray-700 mr-4'>
                    <div className='text-xl font-semibold text-gray-900'>Synopsis:</div>
                    <div className='line-clamp-3 text-wrap w-[50vw]'>
                        The tale of how i got to an escape from the storm.Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </div>
                </div>
                <Link className='text-white bg-blue-800 hover:bg-blue-900 py-2 px-4 font-semibold rounded-md mr-auto shadow'>
                    Read Now
                </Link>
            </div>
        </div>
    )
}

export default Story