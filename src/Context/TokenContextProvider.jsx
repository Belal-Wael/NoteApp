import { createContext, useState } from "react";
import React from 'react'



export const TokenContext=createContext();

export default function TokenContextProvider(props) {
    const [token,setToken]=useState(localStorage.getItem('token'));
  return (
    <TokenContext.Provider value={{token,setToken}}>
         {props.children}
    </TokenContext.Provider>
  )
}
