import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'


const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp","image/jfif"];

const SignUpSchema = z.object({
    fullname: z.string().min(1, 'Fullname is required'),
    username: z.string().min(1, 'Username is required'),
    email: z.string().min(1, 'Email is required').email(),
    password: z.string().min(8, 'Password is required'),
    avatar: z.any()
        .refine((file) => file?.[0]?.size <= 5000000, `Max image size is 5MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            ".jpg, .jpeg, .png and .webp files are accepted."
        ),
});

const Signup = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: zodResolver(SignUpSchema) });

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('fullname', data.fullname);
        formData.append('username', data.username);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('avatar', data.avatar[0]);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };


        await axios
            .post('/api/v1/users/register', formData)
            .then((response) => {
                toast.success('User created successfully');
                navigate('/login');
            })
            .catch((error) => {
                toast.error(error.response.data);
            });
    }
    return (
        <div className='w-[98vw] h-[120vh] flex flex-col justify-center items-center'>
            <div className='bg-blue-100 shadow-lg ring ring-gray-300 w-[30%] p-10'>
                <h2 className='text-3xl font-bold mb-4 text-center'>Signup</h2>
                <div>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="fullname" className=' ml-1 text-lg font-semibold'>Fullname</label>
                            <input type="text" id='fullname' className='outline-none rounded-sm ring-0 focus:ring-2 ring-blue-900 p-1' {...register('fullname', { required: true })} />
                            <div>{errors.fullname && <span>{errors.fullname.message}</span>}</div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="username" className='ml-1 text-lg font-semibold'>Username</label>
                            <input type="text" id='username' className='outline-none rounded-sm ring-0 focus:ring-2 ring-blue-900 p-1' {...register('username', { required: true })} />
                            <div>{errors.username && <span>{errors.username.message}</span>}</div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="email" className='ml-1 text-lg font-semibold'>Email</label>
                            <input type="email" id='email' className='outline-none rounded-sm ring-0 focus:ring-2 ring-blue-900 p-1' {...register('email', { required: true })} />
                            <div>{errors.email && <span>{errors.email.message}</span>}</div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="password" className='ml-1 text-lg font-semibold'>Password</label>
                            <input type="password" id='password' className='outline-none rounded-sm ring-0 focus:ring-2 ring-blue-900 p-1 ' {...register('password', { required: true })} />
                            <div>{errors.password && <span>{errors.password.message}</span>}</div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="avatar" className='ml-1 text-lg font-semibold'>Avatar</label>
                            <input type="file" id='avatar' className='outline-none rounded-sm ring-0 focus:ring-2 ring-blue-900 p-1' {...register('avatar', { required: true })} />
                            <div>{errors.avatar && <span>{errors.avatar.message}</span>}</div>
                        </div>
                        <button type='submit' className='bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded'>Signup</button>
                    </form>
                    <p className='text-center mt-4'>Already have an account? <Link to='/login' className='text-blue-800 hover:text-blue-900 underline font-medium'>Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signup