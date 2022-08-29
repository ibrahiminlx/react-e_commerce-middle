import React from 'react';
import {Link} from "react-router-dom";
import styles from "./styles.module.css"
import { Button } from '@chakra-ui/react'
import {useAuth} from "../Context/AuthContext";
import {useBasket} from "../Context/BasketContext";

function Navbar(props) {
    const {loggedIn,user}=useAuth()
    const {items}=useBasket()


    return (
        <>
            <nav className={styles.nav}>
                <div className={styles.left}>
                    <div className={styles.logo}>
                        <Link to={"/"}>Ecommerce</Link>
                    </div>
                    <ul className={styles.menu}>
                        <li>
                            <Link to={"/"}>Products</Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.right}>
                    {
                        loggedIn ?
                            <>
                                {
                                    items.length>0 && (
                                        <Link to={"/basket"}>
                                            <Button colorScheme={"pink"} variant={"outline"}>
                                                Basket ({items.length})
                                            </Button>
                                        </Link>
                                    )
                                }
                                {
                                    user?.role==="admin" && (
                                        <Link to={"/admin"}>
                                            <Button colorScheme='teal' >Admin</Button>
                                        </Link>
                                    )
                                }
                                <Link to={"/profile"}>
                                    <Button colorScheme='blackAlpha'>Profile</Button>
                                </Link>
                            </>
                            :
                            <>
                                <Link to={"/signIn"}>
                                    <Button colorScheme='pink'>Login</Button>
                                </Link>
                                <Link to={"/signUp"}>
                                    <Button colorScheme='pink'>Register</Button>
                                </Link>
                            </>
                    }
                </div>
            </nav>

        </>

    );
}

export default Navbar;