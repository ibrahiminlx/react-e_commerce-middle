import React from 'react';
import {useAuth} from "../../Context/AuthContext";
import {Button, Text} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

function Profile() {
    const history=useNavigate()
    const {user,logout} = useAuth()

    const handleLogout = async ()=>{
        await logout(()=>{
            history("/")
        })
    }

    return (
        <div>
            <Text fontSize={"xl"} as={"b"}>Profile</Text>
            <pre>
                {JSON.stringify(user)}
            </pre>
            <br/>
            <br/>
            <Button colorScheme={"pink"} variant={"outline"} onClick={handleLogout}>Logout</Button>
        </div>
    );
}

export default Profile;