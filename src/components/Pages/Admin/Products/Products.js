import React,{useMemo} from 'react';
import styles from "./styles.module.css"
import {useQuery,useMutation,useQueryClient} from "react-query";
import {fetchProductList,DeleteProduct} from "../../../../api";
import {Table,Popconfirm} from "antd";
import {Button, Flex, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";


function Products(props) {
    const {isLoading,isError,data,error} = useQuery("admin:products",fetchProductList)
    const queryClient = useQueryClient()

    const deleteMotation =useMutation(DeleteProduct,{
        onSuccess:()=>queryClient.invalidateQueries('admin:products')
    })

    const columns= useMemo(()=>{
        return [
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
            },{
                title: "Price",
                dataIndex: "price",
                key: "price"
            },{
                title: "Created At",
                dataIndex: "createdAt",
                key: "createdAt"
            },{
                title: "Action",
                dataIndex: "action",
                render:(text,record)=> (
                    <>
                        <Link to={`/admin/products/${record._id}`}>Edit</Link>
                        <Popconfirm
                            title={"Are You Sure"}
                            onConfirm={()=>{
                                deleteMotation.mutate(record._id,{
                                    onSuccess:()=>{
                                        console.log("success")
                                    },
                                })
                            }}
                            onCancel={()=>{
                                console.log("iptal edildi")
                            }}
                            okText={"Yes"}
                            cancelText={"No"}
                            placement={"left"}

                        >
                            <a href={"/#"} style={{marginLeft:"10px"}}>Delete</a>
                        </Popconfirm>
                    </>
                )

            },

        ]
    },[deleteMotation])

    if (isLoading){
        return <div>Loading...</div>
    }
    if (isError){
        return <div>Error : {error.message}</div>
    }


    return (

        <div className={styles.top}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Text fontSize={"2xl"} p={5}>Products</Text>
                <Link to={"/admin/products/new"}>
                    <Button colorScheme={"green"}>New</Button>

                </Link>
            </Flex>

            <Table dataSource={data} columns={columns} rowKey={"_id"}></Table>
        </div>
    );
}

export default Products;