import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

const Crypto=createContext();

const CryContext = ({children}) => {
    const[Currency,setCurrency]=useState("INR");
    const[symbol,setSymbol]=useState("₹");
    useEffect(()=>{
        if(Currency==="INR")setSymbol("₹");
        else if(Currency==="USD") setSymbol("$");
    },[Currency]);
     
  return <Crypto.Provider value={{symbol,Currency,setCurrency}}>{children}</Crypto.Provider>
  
}
export default CryContext;
export const CryptoState=()=>{
  return useContext(Crypto);
}