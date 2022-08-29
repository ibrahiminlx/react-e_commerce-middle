import React from 'react';
import styles from "./styles.module.css"
import {useMutation, useQueryClient} from "react-query";
import {PostProduct} from "../../../../api";
import {Formik,FieldArray} from "formik";
import {Box, Button, FormControl, FormLabel, Input, Text, Textarea} from "@chakra-ui/react";
import {message} from "antd"
import editSchema from "./validations";

function NewProducts(props) {
    const queryClient=useQueryClient()
    const newProductMutation = useMutation(PostProduct,{
        onSuccess:()=>queryClient.invalidateQueries("admin:products")
    })


    const handleSubmit=async (values,bag)=>{
        console.log(values)
        message.loading({content:"Loading...",key:"product_new"})
        const newValues={
            ...values,
            photos:JSON.stringify(values.photos)
        }
        newProductMutation.mutate(newValues,{
            onSuccess:()=>{
                console.log("success")
                message.success({
                    content:"The New Product Successfully",
                    key:"product_new",
                    duration:2
                })
            }
        })

    }


    return (
        <div className={styles.mt}>
            <Text fontSize={"2xl"} mt={"20px"}>New Product</Text>
            <Formik initialValues={{
                title:"",
                description:"",
                price:"",
                photos:[]
            }}
                    validationSchema={editSchema}
                    onSubmit={handleSubmit}
            >{({
                   handleSubmit,
                   errors,
                   touched,
                   handleChange,
                   handleBlur,
                   values,
                   isSubmitting})=>(
                <>
                    <Box>
                        <Box my={"5"} textAlign={"left"}>
                            <form onSubmit={handleSubmit}>
                                <FormControl>
                                    <FormLabel>Title</FormLabel>
                                    <Input
                                        name={"title"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.title}
                                        disabled={isSubmitting}
                                        isInvalid={touched.title && errors.title}
                                    />
                                    {touched.title && errors.title && (
                                        <Text color={"red"} mt={"2"} fontSize={"large"}>{errors.title}</Text>
                                    )}
                                </FormControl>
                                <FormControl mt={"5"}>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea
                                        name={"description"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.description}
                                        disabled={isSubmitting}
                                        isInvalid={touched.description && errors.description}
                                    />
                                    {touched.description && errors.description && (
                                        <Text color={"red"} mt={"2"} fontSize={"large"}>{errors.description}</Text>
                                    )}
                                </FormControl>
                                <FormControl mt={"5"}>
                                    <FormLabel>Price</FormLabel>
                                    <Input
                                        name={"price"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.price}
                                        disabled={isSubmitting}
                                        isInvalid={touched.price && errors.price}
                                    />
                                    {touched.price && errors.price && (
                                        <Text color={"red"} mt={"2"} fontSize={"large"}>{errors.price}</Text>
                                    )}
                                </FormControl>
                                <FormControl mt={"5"}>
                                    <FormLabel>Photos</FormLabel>
                                    <FieldArray
                                        name={"photos"}
                                        render={(arrayHelpers)=>(
                                            <div>
                                                {
                                                    values.photos && values.photos.map((photo,index)=>(
                                                        <div key={index}>
                                                            <Input
                                                                name={`photos.${index}`}
                                                                value={photo}
                                                                disabled={isSubmitting}
                                                                onChange={handleChange}
                                                                width={"3xl"}
                                                            />
                                                            <Button
                                                                ml={"4"}
                                                                type={"button"}
                                                                colorScheme={"red"}
                                                                onClick={()=>arrayHelpers.remove(index)}
                                                            >Remove</Button>
                                                        </div>
                                                    ))
                                                }
                                                <Button mt={"5"} onClick={()=>arrayHelpers.push("")} colorScheme={"green"}>Add a Photo</Button>
                                            </div>
                                        )}
                                    />

                                </FormControl>


                                <Button mt={"4"} width={"full"} type={"submit"} isLoading={isSubmitting} colorScheme={"yellow"}>
                                    Save Data
                                </Button>
                            </form>

                        </Box>
                    </Box>
                </>
            )
            }

            </Formik>
        </div>
    );
}

export default NewProducts;