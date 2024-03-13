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
        <div className='flex flex-col min-w-[100px] gap-2 rounded-lg bg-gray-50 shadow mx-auto p-4 border border-gray-300 hover:bg-gray-100 hover:border-gray-500 cursor-pointer'>
            <div className='rounded-md'>
                <img src={ImageSrc} alt={Title} className='object-cover aspect-video rounded-md' />
            </div>
            <div className='flex flex-col'>
                <div className='text-xl font-semibold text-blue-800'>
                    {Title}
                </div>
                <div className='text-lg font-medium'>
                    {Author}
                </div>
                <div className='flex flex-col md:flex-row justify-between text-xl font-medium flex-nowrap'>
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