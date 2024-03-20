import React from 'react'
import Card from '../components/General/Card'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'

const UserStories = () => {
    const {id}=useParams()
    const { data: stories, isLoading, isError } = useQuery(['stories'],()=> axios.get(`/api/v1/stories/user/${id}`).then((response) => response.data.data))
    if (isLoading) {
        return <h2>Loading...</h2>
    }
    if (isError) {
        return <h2>sorry something went wrong</h2>
    }
  return (
    <div className='w-screen h-min-[200vh] gap-10 p-10 grid grid-cols-1 sm:grid-cols-3'>
        {stories && stories.map((story) =>{
            return (
                <Card key={story._id} 
                    id={story._id}
                    Title={story.title}
                    Author={story.author.username}
                    ImageSrc={story.coverImage}
                    Rating={story.rating?.reduce((a, b) => a + b, 0) / story.rating?.length || 0}
                    to={story._id}
                />
            )
        })}
    </div>
  )
}

export default UserStories