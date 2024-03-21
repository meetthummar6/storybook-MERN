import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const Story = () => {
    const { id } = useParams()
    const { user } = useContext(AuthContext)
    const { data: story, isLoading, isError } = useQuery(['story'], () => axios.get(`/api/v1/stories/story/${id}`).then((response) => response.data.data))

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        return <h2>sorry something went wrong</h2>
    }
    return (
        <div className='w-screen h-screen flex flex-col sm:flex-row gap-10 sm:mx-[8vw] p-10'>
            <img src={story.coverImage} alt="hero" className='aspect-[9/16] h-1/3 sm:h-[500px] w-[98vw] sm:w-1/3 ring ring-gray-500   object-cover shadow-md bg-transparent' />
            <div className='flex flex-col gap-6 w-full sm:w-2/3 '>
                <div className='text-5xl font-semibold text-blue-800'>
                    {story.title}
                </div>
                <div className='text-xl font-medium text-gray-500'>
                    {story.author.username}
                </div>
                <div className='text-lg font-medium'>
                    Rating: <span className='text-blue-800'>{story.rating?.reduce((a, b) => a + b) / story.rating?.length || 0}</span>
                </div>
                <div className='text-xl font-semibold bg-gray-300 py-2 px-4 rounded-md shadow mr-auto text-blue-800'>
                    {story.category.name}
                </div>
                <div className='text-lg font-medium text-gray-700 mr-4'>
                    <div className='text-xl font-semibold text-gray-900'>Synopsis:</div>
                    <div className='line-clamp-3 text-wrap w-[50vw]'>
                        {story.description}
                    </div>
                </div>
                <Link to={`/story/${story._id}`} className='text-white bg-blue-800 hover:bg-blue-900 py-2 px-4 font-semibold rounded-md mr-auto shadow'>
                    Read Now
                </Link>
                {
                    user && user._id === story.author._id && (
                        <>
                            <Link to={`/story/${story._id}/edit`} className='text-white bg-blue-800 hover:bg-blue-900 mr-auto py-2 px-4 font-semibold rounded-md shadow'>
                                Edit
                            </Link>
                            <Link to={`/story/${story._id}/addchapter`} className='text-white bg-blue-800 hover:bg-blue-900 mr-auto py-2 px-4 font-semibold rounded-md shadow'>
                                Add Chapter
                            </Link>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Story