import React from 'react';
import {Link, Outlet} from "react-router-dom"
import styles from "./styles.module.css"



function Admin(props) {

    return (
        <>
            <nav>
                <ul className={styles.admin_menu}>
                    <li>
                        <Link to={"/admin"}>Home</Link>
                    </li>
                    <li>
                        <Link to={"/admin/orders"}>Orders</Link>
                    </li>
                    <li>
                        <Link to={"/admin/products"}>Products</Link>
                    </li>
                </ul>

            </nav>
            <Outlet/>




        </>

);
}

export default Admin;