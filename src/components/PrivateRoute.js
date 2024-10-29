import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';


const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('jwt');
    
    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; 
        if (decodedToken.exp < currentTime) {
         
            localStorage.removeItem('jwt'); 
            return <Navigate to="/login" />;
        }
    } catch (error) {
        
        localStorage.removeItem('jwt'); 
        return <Navigate to="/login" />;
    }

    return children;
};
export default PrivateRoute;

