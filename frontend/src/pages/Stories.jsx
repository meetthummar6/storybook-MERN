import React from 'react'
import Card from '../components/General/Card'
import { useInfiniteQuery } from 'react-query'
const fetchData = async ({ PageParam = 1 }) => {
    const data = [
        {
            id: 1,
            ImageSrc: "hero.jpg",
            title: "Lost in the Storm",
            author: "Kevin Fiege",
            category: "Sci-fi",
            rating: "4.7"
        },
        {
            id: 2,
            ImageSrc: "hero.jpg",
            title: "The Story of the Dragon",
            author: "Justin Denney",
            category: "Fantasy",
            rating: "4.9"
        },
        {
            id: 3,
            ImageSrc: "hero.jpg",
            title: "Lost in the Storm",
            author: "Kevin Fiege",
            category: "Sci-fi",
            rating: "4.7"
        },
        {
            id: 4,
            ImageSrc: "hero.jpg",
            title: "The Story of the Dragon",
            author: "Justin Denney",
            category: "Fantasy",
            rating: "4.9"
        },
        {
            id: 5,
            ImageSrc: "hero.jpg",
            title: "Lost in the Storm",
            author: "Kevin Fiege",
            category: "Sci-fi",
            rating: "4.7"
        },
        {
            id: 6,
            ImageSrc: "hero.jpg",
            title: "The Story of the Dragon",
            author: "Justin Denney",
            category: "Fantasy",
            rating: "4.9"
        },
        {
            id: 7,
            ImageSrc: "hero.jpg",
            title: "Lost in the Storm",
            author: "Kevin Fiege",
            category: "Sci-fi",
            rating: "4.7"
        },
        {
            id: 8,
            ImageSrc: "hero.jpg",
            title: "The Story of the Dragon",
            author: "Justin Denney",
            category: "Fantasy",
            rating: "4.9"
        },
        {
            id: 9,
            ImageSrc: "hero.jpg",
            title: "Lost in the Storm",
            author: "Kevin Fiege",
            category: "Sci-fi",
            rating: "4.7"
        },
        {
            id: 10,
            ImageSrc: "hero.jpg",
            title: "The Story of the Dragon",
            author: "Justin Denney",
            category: "Fantasy",
            rating: "4.9"
        },
        {
            id: 11,
            ImageSrc: "hero.jpg",
            title: "Lost in the Storm",
            author: "Kevin Fiege",
            category: "Sci-fi",
            rating: "4.7"
        },
        {
            id: 12,
            ImageSrc: "hero.jpg",
            title: "The Story of the Dragon",
            author: "Justin Denney",
            category: "Fantasy",
            rating: "4.9"
        },
        {
            id: 13,
            ImageSrc: "hero.jpg",
            title: "Lost in the Storm",
            author: "Kevin Fiege",
            category: "Sci-fi",
            rating: "4.7"
        },
        {
            id: 14,
            ImageSrc: "hero.jpg",
            title: "The Story of the Dragon",
            author: "Justin Denney",
            category: "Fantasy",
            rating: "4.9"
        },
        {
            id: 15,
            ImageSrc: "hero.jpg",
            title: "Lost in the Storm",
            author: "Kevin Fiege",
            category: "Sci-fi",
            rating: "4.7"
        },
        {
            id: 16,
            ImageSrc: "hero.jpg",
            title: "The Story of the Dragon",
            author: "Justin Denney",
            category: "Fantasy",
            rating: "4.9"
        },
    ]
    return data.filter((story) => story.id >= (PageParam - 1) * 8 && story.id < PageParam * 8 + 1)
}

const Stories = () => {
    const {
        isLoading,
        isError,
        error,
        data,
        fetchNextPage,
        isFetching,
        isFetchingNextPage
    } = useInfiniteQuery(['Stories'], fetchData, {
        getNextPageParam: (lastPage, pages) => {
            return lastPage[7].id / 8 + 1
        }
    })
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
                    data && data.pages.map((page) => {
                        return page.map((story) => {
                        return <Card key={story.id} ImageSrc={story.ImageSrc} Title={story.title} Author={story.author} Category={story.category} Rating={story.rating} to={story.id} />
                        })
                    })
                }
            </div>
            <div className='col-span-1 bg-gray-100 font-semibold text-lg mx-auto px-4 py-2 shadow ring-1 ring-gray-700'>
                <button onClick={fetchNextPage}>Load More</button>
            </div>
            <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
        </div>
    )
}

export default Stories