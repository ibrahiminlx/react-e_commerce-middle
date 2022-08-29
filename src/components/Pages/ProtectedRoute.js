import React from 'react';
import {Navigate} from "react-router-dom";
import {useAuth} from "../Context/AuthContext";



function ProtectedRoute({children}) {
    const {loggedIn} = useAuth()
    return loggedIn ? children : <Navigate to={"/"} />



}

export default ProtectedRoute;