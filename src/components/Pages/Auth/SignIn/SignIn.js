import React from 'react';
import {Flex, Box, Heading, FormControl, FormLabel, Input, Button,Alert} from "@chakra-ui/react"
import {useFormik} from "formik";
import validationSchema from "./Validations";
import {fetchLogin} from "../../../../api";
import {useAuth} from "../../../Context/AuthContext";
import {useNavigate} from "react-router-dom"



function SignIn() {
    const history = useNavigate()
    const {login} = useAuth()
    const formik = useFormik({
        initialValues:{
            email:"",
            password:"",
            passwordConfirm:""
        },
        validationSchema,
        onSubmit:async (values,bag)=>{
            try {
                const loginResponse =await fetchLogin({email:values.email,password: values.password})
                login(loginResponse)
                history("/")

            }catch (e) {
                bag.setErrors({general:e.response.data.message})
            }

        }
    })
    return (
        <div>
            <Flex align={"center"} width={"full"} justifyContent={"center"}>
                <Box pt={10}>
                    <Box>
                        <Heading>Sign In</Heading>
                    </Box>
                    <Box my={5}>
                        {formik.errors.general && (
                            <Alert status={"error"}>
                                {formik.errors.general}
                            </Alert>
                        )}
                    </Box>
                    <Box my={5} textAlign={"left"}>
                        <form onSubmit={formik.handleSubmit}>
                            <FormControl>
                                <FormLabel>E-mail</FormLabel>
                                <Input
                                    name={"email"}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    isInvalid={formik.touched.email && formik.errors.email}
                                ></Input>
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    name={"password"}
                                    type={"password"}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    isInvalid={formik.touched.password && formik.errors.password}
                                ></Input>
                            </FormControl>
                            <Button mt={4} width={"full"} colorScheme={"teal"} type={"submit"}>
                                Sign In
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Flex>
        </div>
    );
}

export default SignIn;