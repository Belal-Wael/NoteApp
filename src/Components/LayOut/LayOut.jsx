import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
export default function LayOut() {
  return (<>
    <Navbar/>
    <div className='relative container xl:w-[85%]  mx-auto min-h-dvh mt-[80px] flex items-center justify-center bg-[#171717] rounded-lg'>
           <Outlet></Outlet>
    </div>
     <Footer/>
  </>)
}
