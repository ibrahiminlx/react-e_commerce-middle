import React from 'react';
import styles from "./styles.module.css"
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {fetchProduct, UpdateProduct} from "../../../../api";
import {Formik,FieldArray} from "formik";
import {Box, Button, FormControl, FormLabel, Input, Text, Textarea} from "@chakra-ui/react";
import {message} from "antd"
import editSchema from "./validations";

function ProductssDetail(props) {
    const {product_id}=useParams()

    const {isLoading,isError,data,error}=useQuery(["admin:product",product_id],()=>fetchProduct(product_id))

    if (isLoading){
        return <div>Loading...</div>
    }
    if (isError){
        return <div>Error {error.message}</div>
    }
    const handleSubmit=async (values,bag)=>{
        message.loading({content:"Loading...",key:"product_update"})
        try {
            await UpdateProduct(values,product_id)
            message.success({
                content:"The Product Succesfully Updated",
                key:"product_update",
                duration:2
                }
            )
        }catch (e) {
            message.error({
                    content:"The Product Error Updated",
                    key:"product_update",
                    duration:2
                }
            )
        }
    }


    return (
        <div className={styles.mt}>
            <Text fontSize={"2xl"}>Edit</Text>
            <Formik initialValues={{
                title:data.title,
                description:data.description,
                price:data.price,
                photos:data.photos
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
                                                 Update Data
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

export default ProductssDetail;