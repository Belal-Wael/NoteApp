import axios from 'axios'
import { useFormik } from 'formik'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Atom } from 'react-loading-indicators';
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'

export default function Register() {
   let navigate=useNavigate();
   const[isLoading,setisLoading]=useState(false);
  //  let[ApiResponse,setApiResponse]=useState('');
  function submitForm(formData){
    setisLoading(true);
     axios.post('https://note-sigma-black.vercel.app/api/v1/users/signUp',formData)
     .then((response)=>{
       if(response.data.msg==='done'){
          setisLoading(true);
          navigate('/login');
       }
     })
     .catch((error)=>{
       toast.error(error.response?.data?.msg, {
        duration: 1500
      })
     })
  }


  const formSchema=yup.object().shape({
    name:yup.string().min(3,"name must be at least three Characters").required('name is required'),
    email:yup.string().email("invalid email").required('name is required'),
    password:yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'password must start with capital character and contain at least 5 character').required('password is required'),
    age:yup.number().moreThan(18,'must be older than 18 years old'),
    phone:yup.string().required("phone is required"),
  })


  const form=useFormik({
    initialValues:{
        name:'',
        email:'',
        password:'',
        age:'',
        phone:''
    },
    onSubmit:submitForm,
    validationSchema:formSchema
  })

  if(isLoading){
     return <div className='absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-10 z-50'>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2">
                <Atom color="#09c" size="medium" text="" textColor="blue"/> 
        </div>
    </div>
  }
 
  return (
    <>
    <section className="w-[90%] h-[90%]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={form.handleSubmit}>
               <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                <input type="text" name="name" value={form.values.name} id="name" onChange={form.handleChange} onBlur={form.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
              </div>
              {form.errors.name&&form.touched.name?<span className='text-red-600'>{form.errors.name}</span>:null}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" value={form.values.email} onChange={form.handleChange} onBlur={form.handleBlur} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
              </div>
              {form.errors.email&&form.touched.email?<span className='text-red-600'>{form.errors.email}</span>:null}
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" value={form.values.password} onChange={form.handleChange} onBlur={form.handleBlur} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
                {form.errors.password&&form.touched.password?<span className='text-red-600'>{form.errors.password}</span>:null}
              <div>
                <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Age</label>
                <input type="number" name="age" value={form.values.age} onChange={form.handleChange} onBlur={form.handleBlur} id="age" placeholder="20" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              {form.errors.age&&form.touched.age?<span className='text-red-600'>{form.errors.age}</span>:null}
              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                <input type="number" name="phone" value={form.values.phone} onChange={form.handleChange} onBlur={form.handleBlur} id="phone" placeholder="0 10 68 686" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              {form.errors.phone&&form.touched.phone?<span className='text-red-600'>{form.errors.phone}</span>:null}
              <button type="submit" disabled={!(form.dirty&&form.isValid)} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
