import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import {useForm} from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import  AuthContext  from '../context/AuthContext'
const LoginSchema = z.object({
    email: z.string().min(1, 'Email is required').email(),
    password: z.string().min(8, 'Password is required'),
});

const Login = () => {
    const navigate=useNavigate()
    const {login}=useContext(AuthContext)
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({ resolver: zodResolver(LoginSchema) });

    const onSubmit = async(data) => {
        await axios
            .post('/api/v1/users/login', data)
            .then((response) => {
                login(response.data.data.user);
                toast.success('User logged in successfully');
                navigate('/');
            })
            .catch((error) => {
                toast.error(error.response.data);
            });
    }
  return (
    <div className='w-[98vw] h-[98vh] flex flex-col justify-center items-center'>
    <div className='bg-blue-100 shadow-lg ring ring-gray-300 w-[30%] p-10'>
        <h2 className='text-3xl font-bold mb-4 text-center'>Login</h2>
        <div>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
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
                <button type='submit' className='bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded mt-2'>Login</button>
            </form>
            <p className='text-center mt-4'>Don't have an account? <Link to='/signup' className='text-blue-800 hover:text-blue-900 underline font-medium'>signup</Link></p>
        </div>
    </div>
</div>
  )
}

export default Login