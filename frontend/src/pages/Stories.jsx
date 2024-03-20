import React, { useEffect } from 'react'
import Card from '../components/General/Card'
import { useInfiniteQuery } from 'react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'

const Stories = () => {
    const fetchData = async (pageParam = 1) => {
        const res = await axios.get(`/api/v1/stories/allstories?page=${pageParam}`)
        return res.data
    }
    const {
        isLoading,
        isError,
        error,
        data,
        hasNextPage,
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
            </div>
            <InfiniteScroll
                dataLength={data?.pages?.length || 0}
                next={fetchNextPage}
                hasMore={hasNextPage}
                loader={<p style={{ color: 'deepskyblue', fontSize: '20px', textAlign: 'center' }}><b>Loading...</b></p>}
                data-testid="infinite-scroll"
                scrollableTarget="scrollbar-target"
                style={{ padding: '5px' }}
                sendMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
            >
                {
                    data?.pages?.map((page) => {
                        return page?.data?.map((story) => {
                            return <Card
                                key={story._id}
                                id={story._id}
                                Title={story.title}
                                ImageSrc={story.coverImage}
                                Author={story.author.username}
                                Category={story.category.name}
                                Rating={story.rating?.reduce((a, b) => a + b) / story.rating?.length || 0}
                                to={story._id}
                            />
                        })
                    })
                }
            </InfiniteScroll>
            <div className='flex justify-center items-center bg-blue-50 font-medium text-lg border border-blue-800 rounded-md px-2 py-1 shadow mx-auto cursor-pointer hover:bg-blue-100'>You have seen it all</div>
        </div >
    )
}

export default Stories