import axios from 'axios'
import { useFormik } from 'formik'
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Atom } from 'react-loading-indicators';
import { Link, useNavigate } from 'react-router-dom'
import { TokenContext } from '../../Context/TokenContext';


export default function Login() {
   const navigate=useNavigate();
   const[isLoading,setisLoading]=useState(false);
   const {setToken}=useContext(TokenContext);

const callApi=(formValues)=>{
      setisLoading(true);
      axios.post('https://note-sigma-black.vercel.app/api/v1/users/signIn',formValues)
      .then((apiResponse)=>{

     if(apiResponse.data?.msg==='done'){
        setisLoading(false);
        setToken(apiResponse.data?.token);
        localStorage.setItem('token',apiResponse.data?.token);
        navigate('/')
    }
    else{
      toast.error('Email or Password incorrect');
    }
   })
   .catch(()=>{
      toast.error('Email or Password incorrect');
   })
}

let form=useFormik({
  initialValues:{
    email:'',
    password:''
  },
  onSubmit:callApi
})

 if(isLoading){
     return <div className='absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-10 z-50'>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2">
                <Atom color="#09c" size="medium" text="" textColor="blue"/> 
        </div>
    </div>
  }

  return (<>
<section className="w-full">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign in to your account
        </h1>
        <form className="space-y-4 md:space-y-6" action="#" onSubmit={form.handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" name="email" value={form.values.email} onChange={form.handleChange} onBlur={form.handleBlur} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password" name="password"  value={form.values.password}  onChange={form.handleChange} onBlur={form.handleBlur} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>

 </> )
}
