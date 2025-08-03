import React, { useCallback, useContext, useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import { TokenContext } from '../../Context/tokenContextProvider';
import notFound from '../../assets/notfounddark.png'
import "flowbite";
import { useFormik } from 'formik';
import { Atom } from 'react-loading-indicators';
export default function Home() {
 const{token}=useContext(TokenContext);
  const [noNotes,setnoNotes]=useState(false);
  const [notes,setNotes]=useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode,setEditMode]=useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);
   const[isLoading,setisLoading]=useState(false);
  const getUserNotes = useCallback(()=>{
    setnoNotes(false);
    setisLoading(true);
   axios.get('https://note-sigma-black.vercel.app/api/v1/notes',{
    headers:{
      token:`3b8ny__${token}`
    }
   }).then((apiResponse)=>{
    if(apiResponse.data.msg==="done"){
       setisLoading(false);
      setNotes(apiResponse.data.notes);
    }
   }).catch((error)=>{
     if(error.response?.data?.msg==="not notes found"){
        setnoNotes(true);
     }
   })
  },[token])

  function HandleFormNote(note ,noteID){
   if(!editMode){
     axios.post(`https://note-sigma-black.vercel.app/api/v1/notes`,note,{
       headers:{
         token:`3b8ny__${token}`
       }
     }).then((apiResponse)=>{
        if(apiResponse.data.msg==="done"){
           setNotes(()=>[...notes,apiResponse.data.note])
            setShowModal(false);
            setEditMode(false);
            setCurrentNoteId(null);
            form.resetForm();
         
        }
     }).catch((error)=>{
        console.log(error);
     })
   }
   else{
    axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${noteID}`,note,{
       headers:{
        token:`3b8ny__${token}`
      }
    }).then((apiResponse)=>{
        if(apiResponse.data.msg==="done"){
           console.log(apiResponse.data.note);
           console.log(noteID);
           
           setNotes((oldState)=>{
            return oldState.map(note=>note._id===noteID?apiResponse.data.note:note)
           })
           setShowModal(false);
           setEditMode(false);
           setCurrentNoteId(null);
           form.resetForm();
        }
    }).catch((error)=>{
      console.log(error);
    })
   }
  }

  function DeleteNote(noteId) {
    axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,{
       headers:{
        token:`3b8ny__${token}`
      }
    }).then((apiResponse)=>{
       if(apiResponse.data.msg==="done"){
        setNotes(oldState=>{
          return oldState.filter(p=>p._id!=noteId);
        })
       }
    }).catch((error)=>{
      console.log(error);
    })
  }

   let form=useFormik({
    initialValues:{
      title:"",
      content:""
    },
    onSubmit:(values) => HandleFormNote(values, currentNoteId)
   })
    useEffect(()=>{
      import("flowbite/dist/flowbite.min.js");
      getUserNotes();
    },[getUserNotes])

   if(isLoading){
     return <div className='absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-10 z-50'>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2">
                <Atom color="#09c" size="medium" text="" textColor="blue"/> 
        </div>
    </div>
  }


  return (<>
    <button  onClick={() => {
        setShowModal(true);
        form.resetForm();
      }}
      className='absolute top-5 right-5 bg-sky-600 py-1 px-4 rounded-lg text-xl font-bold text-black cursor-pointer hover:bg-sky-400
      '>
        Add Note
    </button>
    <div className="container mx-auto mt-10">
        <div className=" flex justify-center items-center gap-2 flex-wrap w-4/5 mx-auto">
         {noNotes?<div className='flex justify-center flex-col text-center'>
           <img src={notFound} alt="not Found photo" width={400} className='mr-4' />
           <h2 className='text-xl text-blue-600 '>No Notes Found</h2>
          </div>:
           notes.map((note)=> <div key={note._id} className='w-full md:w-1/2 lg:w-1/4 text-center rounded-lg p-4 bg-black text-white'>
              <div className=" flex flex-col p-4">
                <h2 className='capitalize text-3xl w-full -mt-2'>{note.title}</h2>
                <div className="icon flex justify-between my-4 pb-4  border-b-2 border-white">
                 <MdDelete onClick={()=>{DeleteNote(note._id)}} className='cursor-pointer text-2xl text-red-700 ' />
                 <FaEdit onClick={()=>{
                  setShowModal(true);
                  setEditMode(true);
                  setCurrentNoteId(note._id)
                  form.setFieldValue('title', note.title);
                  form.setFieldValue('content', note.content);
                 }} className='cursor-pointer text-2xl text-green-700'/>
                </div>
                <div className="content">{note.content}</div>
              </div>
           </div>)
           }
        </div>
    </div>
  {
    showModal&&<div>
  <div id="crud-modal" tabIndex={-1} aria-hidden="true" className="flex  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-30">
    <div className="relative p-4 w-full max-w-md max-h-full">
      {/* Modal content */}
      <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
           {editMode?'Edit current Note':'Create New Notes'} 
          </h3>
          <button type="button"onClick={() => {
            setShowModal(false);
            setEditMode(false);
          }
          } className="text-blue-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
            X
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        {/* Modal body */}
        <form className="p-4 md:p-5" onSubmit={form.handleSubmit}>
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
              <input type="text" name="title" id="title" value={form.values.title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type note name" required  onChange={form.handleChange} onBlur={form.handleBlur}/>
            </div>
            <div className="col-span-2">
              <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note Content</label>
              <textarea id="content" rows={4} name='content' value={form.values.content} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write note description here" onChange={form.handleChange} onBlur={form.handleBlur} />                    
            </div>
          </div>
          <button type="submit" className="text-white inline-flex items-center bg-sky-600 hover:bg-sky-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
             {editMode?"Update Notes": "Add new Note"}
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
  }


  </>)
}
