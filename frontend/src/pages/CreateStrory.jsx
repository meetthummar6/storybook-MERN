import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useEffect, useState } from 'react'

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/jfif"];

const CreateStrorySchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    category: z.string().min(1, 'Category is required'),
    isPublished: z.boolean().default(false),
    coverImage: z.any()
        .refine((file) => file?.[0]?.size <= 5000000, `Max image size is 5MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            ".jpg, .jpeg, .png and .webp files are accepted."
        ),
})

const CreateStrory = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const fetchCategories = async () => {
            await axios.get('/api/v1/categories/').then(
                (response) => {
                    setCategories(response.data.data)
                }
            ).catch((error) => {
                console.log(error)
            })
            
        }
        fetchCategories()
    })
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: zodResolver(CreateStrorySchema) });
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('author', user._id);
        formData.append('category', data.category);
        formData.append('isPublished', data.isPublished);
        formData.append('coverImage', data.coverImage[0]);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };


        await axios
            .post('/api/v1/stories/story', formData)
            .then((response) => {
                toast.success('Story created successfully');
                navigate('/');
            })
            .catch((error) => {
                console.log(error)
                toast.error(error.response.data);
            });
    }
    return (
        <div className='w-[98vw] h-[98vh] flex flex-col gap-6 p-10 mx-10'>
            <div className='text-3xl font-bold text-center text-blue-800'>
                Create Story
            </div>
            <form className='flex flex-col gap-y-8' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="title" className='ml-1 text-lg font-semibold'>Title:</label>
                    <input type="text" id='title' className=' w-2/3 outline-none rounded-sm shadow-sm border border-neutral-400 ring-0 focus:ring-2 focus:ring-blue-900 p-1' {...register('title')} />
                    {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="description" className='ml-1 text-lg font-semibold'>Description:</label>
                    <textarea type="text" id='description' className='w-3/4 outline-none rounded-sm shadow-sm ring-0 border border-neutral-400 focus:ring-2 focus:ring-blue-900 p-1' {...register('description')} />
                    {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                </div>
                <div className='flex flex-row gap-8 justify-between items-center w-[88vw]'>
                    <div className='flex gap-2'>
                        <label htmlFor="coverImage" className='ml-1 text-lg font-semibold'>Cover Image:</label>
                        <input type="file" id='coverImage' className='w-[25vw] outline-none  rounded-sm shadow-sm  ring-2 ring-blue-900  p-1' {...register('coverImage')} />
                        {errors.coverImage && <p className='text-red-500'>{errors.coverImage.message}</p>}
                    </div>
                    <div className='flex gap-2'>
                        <label htmlFor="category" className='ml-1 text-lg font-semibold'>Category:</label>
                        <select name="category" id="category" defaultValue="select" className='w-[16vw] outline-none rounded-sm shadow-sm  ring-2 ring-blue-900  p-1' {...register('category')}>
                            <option value="select">Select</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                        {errors.category && <p className='text-red-500'>{errors.category.message}</p>}
                    </div>
                    <div className='flex gap-2'>
                        <label htmlFor="isPublished" className='ml-1 text-lg font-semibold'>Publish:</label>
                        <input type="checkbox" id='isPublished' className='w-[3vw] outline-none rounded-sm shadow-sm p-1' {...register('isPublished')} />
                        {errors.isPublished && <p className='text-red-500'>{errors.isPublished.message}</p>}
                    </div>
                </div>
                <button type='submit' className='bg-blue-800 text-white text-xl font-medium mx-auto w-[10vw] p-2 rounded-md mt-4'>Create</button>
            </form>
        </div>
    )
}

export default CreateStrory