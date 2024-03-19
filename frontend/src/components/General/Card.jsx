import React from 'react'
import { Link } from 'react-router-dom'

const Card = (
    {
        ImageSrc,
        Title,
        Author,
        Rating,
        to,
    }
) => {
    return (
        <div className='flex flex-col min-w-[100px] h-[50vh] gap-2 rounded-lg bg-gray-50 shadow mx-auto p-4 border border-gray-300 hover:bg-gray-100 hover:border-gray-500 cursor-pointer'>
            <div className='rounded-md h-[30vh] top-0 left-0 relative overflow-hidden'>
                <img src={ImageSrc} alt={Title} className='absolute object-cover aspect-[3/4] rounded-md' />
            </div>
            <div className='flex flex-col h-[20vh]'>
                <div className='text-xl font-semibold text-blue-800 text-wrap line-clamp-1'>
                    {Title}
                </div>
                <div className='text-lg font-medium text-wrap line-clamp-1'>
                    {Author}
                </div>
                <div className='flex flex-col md:flex-row justify-between text-xl font-medium flex-nowrap gap-4'>
                    <div className='text-gray-400'>
                        rating: <span className='text-blue-800'>{Rating}</span>
                    </div>
                    <Link to={`/story/${to}`} className='text-white bg-blue-800 hover:bg-blue-900 py-1 px-3 rounded-md shadow'>
                        Read Now
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Card