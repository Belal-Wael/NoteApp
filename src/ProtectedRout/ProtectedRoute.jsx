import React, { useContext } from 'react'
import { TokenContext } from '../Context/TokenContext'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute(props) {
   let {token}=useContext(TokenContext);
   if(token){
      return props.children;
   }
   else{
    return <Navigate to={'/login'}/>
   }
}
