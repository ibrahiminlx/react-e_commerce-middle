import React from 'react';
import {Navigate} from "react-router-dom";
import {useAuth} from "../Context/AuthContext";




function AdminRoute({children}) {
    const {user} = useAuth()
    return user.role === "admin" ? children : <Navigate to={"/"}/>




}

export default AdminRoute;