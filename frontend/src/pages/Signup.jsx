import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import {useForm} from 'react-hook-form'
import { z } from 'zod';
import { someSchema } from '../components/checkFile'
import { zodResolver } from '@hookform/resolvers/zod'

const SignUpSchema = z.object({
    fullname: z.string().min(1, 'Fullname is required'),
    username: z.string().min(1, 'Username is required'),
    email: z.string().min(1, 'Email is required').email(),
    password: z.string().min(8, 'Password is required'),
    avatar: someSchema,
});

const Signup = () => {
    const navigate=useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({ resolver: zodResolver(SignUpSchema) });

    const onSubmit = (data) => {
        axios
            .post('/api/v1/users/register', data)
            .then((response) => {
                toast.success('User created successfully');
                navigate('/login');
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    }
    return (
        <div className='w-[98vw] h-[98vh] flex flex-col justify-center items-center'>
            <div className='bg-blue-100 shadow-lg ring ring-gray-300 w-[30%] p-10'>
                <h2 className='text-3xl font-bold mb-4 text-center'>Signup</h2>
                <div>
                    <form className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="fullname" className=' ml-1 text-lg font-semibold'>Fullname</label>
                            <input type="text" id='fullname' className='outline-none rounded-sm ring-0 focus:ring-2 ring-blue-900 p-1' {...register('fullname')} />
                            {errors.fullname && <span>{errors.fullname.message}</span>}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="username" className='ml-1 text-lg font-semibold'>Username</label>
                            <input type="text" id='username' className='outline-none rounded-sm ring-0 focus:ring-2 ring-blue-900 p-1' {...register('username')} />
                            {errors.username && <span>{errors.username.message}</span>}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="email"className='ml-1 text-lg font-semibold'>Email</label>
                            <input type="email" id='email' className='outline-none rounded-sm ring-0 focus:ring-2 ring-blue-900 p-1' {...register('email')} />
                            {errors.email && <span>{errors.email.message}</span>}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="password" className='ml-1 text-lg font-semibold'>Password</label>
                            <input type="password" id='password' className='outline-none rounded-sm ring-0 focus:ring-2 ring-blue-900 p-1' {...register('password')}/>
                            {errors.password && <span>{errors.password.message}</span>}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="avatar" className='ml-1 text-lg font-semibold'>Avatar</label>
                            <input type="file" id='avatar' className='outline-none rounded-sm ring-0 focus:ring-2 ring-blue-900 p-1' {...register('avatar')}/>
                            {errors.avatar && <span>{errors.avatar.message}</span>}
                        </div>
                        <button type='submit' className='bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded' onClick={handleSubmit(onSubmit)}>Signup</button>
                    </form>
                    <p className='text-center mt-4'>Already have an account? <Link to='/login' className='text-blue-800 hover:text-blue-900 underline font-medium'>Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signup