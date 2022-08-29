import React from 'react';
import styles from "./styles.module.css"
import {useQuery} from "react-query";
import {FetchOrders} from "../../../../api";
import {Table, Thead, Tbody, Text, TableCaption, Tr,Th,Td} from "@chakra-ui/react"

function Orders(props) {
    const {isLoading,isError,data,error}=useQuery("admin:orders",FetchOrders)

    if (isLoading){
        return <div>Loading...</div>
    }
    if (isError){
        return <div>Error {error.message}</div>
    }


    return (
        <div className={styles.top}>
            <Text fontSize={"2xl"} p={5}>
                Orders
            </Text>
            <Table variant={"simple"}>
                <TableCaption>Table caption Method</TableCaption>
                <Thead>
                    <Tr>
                        <Th>User</Th>
                        <Th>Address</Th>
                        <Th>Items</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        data.map((item,index)=>(
                            <Tr key={index} >
                                {/*{console.log(item)}*/}
                                <Td>{item.user.email}</Td>
                                <Td>{item.adress}</Td>
                                <Td>{(item.items).map((data,index)=>(
                                    <li key={index}>{data.title}</li>
                                ))}</Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </div>
    );
}

export default Orders;