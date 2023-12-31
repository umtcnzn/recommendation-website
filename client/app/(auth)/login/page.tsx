"use client"

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

import { useFormik } from 'formik';

import {  redirect, useRouter } from 'next/navigation';
import { LoginSchema,LoginType } from '../validation';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useAuth } from '@/app/_context/userContext';
import toast, { Toaster } from 'react-hot-toast';

 function Login() {

    const router = useRouter();

    const {login,user} = useAuth();
    const [loading,setLoading] = useState(false);
  
    async function signIn(values:LoginType){
        try{
            const {data} = await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_HOST}/auth/login`,values);
            toast.success(data.message)
            setTimeout(()=>{
            login(data.token)
            },2000)
        }
        catch(error){
            if(error instanceof AxiosError){
                toast.error(error?.response?.data.message,{duration:2000});
            }
        }
        finally{
            setLoading(false);
        }
    }

    const {handleSubmit,handleChange,errors,touched,values} = useFormik<LoginType>({
        initialValues: {
            email:'',
            password:'',
        },
        validationSchema:LoginSchema,
        onSubmit:(values) => {
            setLoading(true);
            signIn(values);
        }
    })
    
    return ( 
    <>
        <Card header={<p className='lg:text-3xl text-black text-2xl pl-5 font-bold'>Sign In</p>} 
        className="drop-shadow-2xl lg:w-2/6 bg-gray-300 rounded-lg pr-0.5 pl-0.5 w-[330px]">
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-3 text-black font-medium lg:text-base text-sm'>
                    <div className='w-full flex flex-col gap-1'>
                       <div className='w-full flex'> 
                            <label htmlFor='email' className='w-1/4 mt-2 mr-1'>Email</label>
                            <InputText id="email" name='email' type='email' value={values.email} onChange={handleChange} 
                                placeholder='' className='p-inputtext-sm w-3/4'/>   
                        </div>

                        {errors.email && touched.email ? (
                        <div className='w-full flex'>
                            <label className='w-1/4'></label>
                            <div className='text-red-500 text-xs w-3/4 ml-1'>
                                {errors.email}
                            </div>
                        </div>) : null}
                                       
                    </div>
                    

                    <div className='w-full flex flex-col gap-1'>
                        <div className='w-full flex'>
                            <label htmlFor='password' className='w-1/4 mt-2 mr-1'>Password</label>
                            <InputText id="password" name='password' value={values.password} onChange={handleChange} type='password' 
                            placeholder='' className='w-3/4 p-inputtext-sm'/>
                        </div>

                        {errors.password && touched.password ? (
                        <div className='w-full flex'>
                            <label className='w-1/4'></label>
                            <div className='text-red-500 text-xs w-3/4 ml-1'>
                                {errors.password}
                            </div>
                        </div>) : null}

                    </div>

                    <p onClick={()=> router.push("/register")}
                     className='text-gray-600 text-sm mt-2 cursor-pointer w-[290px] underline'>If haven't an account click here to register.
                    </p>
                    
                    <div className='justify-end flex mt-4'>
                        <Button label='Sign in' size='small' type='submit' loading={loading}  />
                    </div>
                    <Toaster position='top-right'/>
                </div>
            </form>
        </Card>
    </> );
    }

export default Login;