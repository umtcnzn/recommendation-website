"use client"
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

import { useFormik } from 'formik';

import { RegisterSchema,RegisterType } from '../validation';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';

function Register() {

    const router = useRouter();
    const [buttonLoading,setButtonLoading] = useState(false);

    const {handleChange,handleSubmit,values,errors,touched,handleReset} = useFormik<RegisterType>({
        initialValues:{
            username: '',
            email:'',
            password:'',
            re_password:'',
        },
        validationSchema:RegisterSchema,
        onSubmit:(values) => {
            setButtonLoading(true);
            addUser();
        }
    })

    async function addUser() {
        try{
            const response = await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_HOST}/auth/register`,
            {"username":values.username,
            "email":values.email,
            "password":values.password});
            toast.success(response.data.message,{duration:1200})
            toast.promise(new Promise((resolve)=>{
                setTimeout(resolve,1500);
            }),{
                loading:"Redirecting to Login Page...",
                success:"Redirecting successful!",
                error:"Redirecting failed!"
            }).then(() =>
                router.push("/")
            )
        }
        catch(error){
            if(error instanceof AxiosError){
                toast.error(error?.response?.data.message,{duration:2000});
            }
        }
        finally{
            setButtonLoading(false);
            handleReset(values);
        }
    }

    return ( <>
    <Card header={<p className='lg:text-3xl text-black text-2xl pl-5 font-bold'>Sign Up</p>} 
        className="drop-shadow-2xl lg:w-2/6 bg-gray-300 rounded-lg pr-0.5 pl-0.5 w-[330px]">
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-3 text-black font-medium lg:text-base text-sm'>

                    <div className='w-full flex flex-col gap-1'>
                        <div className='w-full flex'>
                            <label htmlFor='username' className='w-1/4 mt-2 mr-1'>Username</label>
                            <InputText id='username' name='username' value={values.username} onChange={handleChange} type='text' 
                            placeholder='' className='w-3/4 p-inputtext-sm'/>
                        </div>

                        {errors.username && touched.username ? (
                        <div className='w-full flex'>
                            <label className='w-1/4'></label>
                            <div className='text-red-500 text-xs w-3/4 ml-1'>
                                {errors.username}
                            </div>
                        </div>) : null}
                    </div>

                    

                    <div className='w-full flex flex-col gap-1'>
                        <div className='w-full flex'>
                            <label htmlFor='email' className='w-1/4 mt-2 mr-1'>Email</label>
                            <InputText id='email' name='email' value={values.email} onChange={handleChange} type='email' 
                            placeholder='' className='w-3/4 p-inputtext-sm'/>
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
                            <InputText id='password' name='password' value={values.password} onChange={handleChange} type='password' 
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

                    

                    <div className='w-full flex flex-col gap-1'>
                        <div className='w-full flex'>
                            <label htmlFor='re_password' className='w-1/4 mt-2 mr-1'>Re-Password</label>
                            <InputText id='re_password' name='re_password' value={values.re_password} onChange={handleChange} type='password' 
                            placeholder='' className='w-3/4 p-inputtext-sm'/>
                        </div>

                         {errors.re_password && touched.re_password ? (
                        <div className='w-full flex'>
                            <label className='w-1/4'></label>
                            <div className='text-red-500 text-xs w-3/4 ml-1'>
                                {errors.re_password}
                            </div>
                        </div>) : null}
                    </div>

                   


                    <p onClick={()=> router.push("/login")} 
                    className='text-gray-600 text-sm mt-2 cursor-pointer w-[290px] underline'>If have an account click here to login.</p>

                    <div className='justify-end flex mt-4'>
                        <Button label='Sign Up' size='small' type='submit' loading={buttonLoading}/>
                    </div>
                    <Toaster position='top-right'/>
                </div>
            </form>

        </Card>
    </> );
}

export default Register;