import React, { useState, useEffect } from "react";
import {jwtDecode} from 'jwt-decode';

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
  const [isData, setIsData] = useState({});
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setIsData(decodedToken);
    }
    else {
      setIsData({});
    }
    
  }, [token]);

  console.log(isData);

  return (
    <Context.Provider value= {{isData, setIsData}}>
      {children}
    </Context.Provider>
  )
}