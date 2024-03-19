import React from 'react'
import Card from '../components/General/Card'
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'

const Stories = () => {
    const fetchData = async (pageParam = 1) => {
        console.log(pageParam)
        const res = await axios.get(`/api/v1/stories/allstories?page=${pageParam}`)
        return res.data

    }
    const {
        isLoading,
        isError,
        error,
        data,
        fetchNextPage,
        isFetching,
        isFetchingNextPage
    } = useInfiniteQuery(['Stories'], ({ pageParam = 1 }) => fetchData(pageParam), {
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.data.length < 8) {
                return undefined
            }
            return allPages.length + 1

        }
    })
    console.log(data)
    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }
    return (
        <div className='w-screen px-20 py-10 flex flex-col gap-6'>
            <div className="text-5xl font-bold text-blue-800 flex justify-between ">
                <div>Stories</div>
                <div className='flex gap-6 text-xl font-semibold items-center text-gray-900'>
                    <div className='hover:text-blue-800 bg-neutral-50 border border-blue-800 rounded-md px-2 py-1 shadow'><select name="genre" className='outline-none bg-neutral-50 scroll-smooth'>
                        <option value="">Genre</option>
                        <option value="">sci-fi</option>
                        <option value="">romance</option>
                        <option value="">horror</option>
                        <option value="">fantasy</option>
                    </select>
                    </div>
                    <div className='hover:text-blue-800 bg-neutral-50 border border-blue-800 rounded-md px-2 py-1 shadow'>
                        <select name="sort" className='outline-none scroll-smooth bg-neutral-50'>
                            <option value="">Latest</option>
                            <option value="">Popular</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 '>
                {
                    data?.pages?.map((page) => {
                        return page?.data?.map((story) => {
                            return <Card key={story?._id}
                                ImageSrc={story?.coverImage}
                                Title={story?.title}
                                Author={story?.author.username}
                                Category={story?.category.name}
                                Rating={4.9}
                                to={story?._id}
                            />
                        })
                    })
                }
            </div>
            <div className='flex justify-center items-center bg-blue-50 font-medium text-lg border border-blue-800 rounded-md px-2 py-1 shadow mx-auto cursor-pointer hover:bg-blue-100' onClick={fetchNextPage}> {!isFetchingNextPage ? 'Load More' : 'Loading...'}</div>
            <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
        </div>
    )
}

export default Stories