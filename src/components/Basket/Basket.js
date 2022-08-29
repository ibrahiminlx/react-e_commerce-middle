import React, {useState} from 'react';
import {useBasket} from "../Context/BasketContext";
import {
    Alert, Box, Button, Image, Text, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure, FormControl, FormLabel, Textarea
} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {PostOrder} from "../../api";

function Basket(props) {
    const [address,setAddress]=useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)


    const {items,removeFromBasket,emptyBasket}=useBasket()

    const total = items.reduce((acc,obj)=> acc + obj.price,0)

    const handleSubmitForm=async ()=>{
        const itemIds = items.map((item)=>item._id)

        const input={
            address,
            items:JSON.stringify(itemIds)
        }

        await PostOrder(input)
        emptyBasket()
        onClose()

    }

    return (
        <Box p={"7"}>
            {
                items.length<1 && (<Alert status={"warning"}>You Have Not Any Items In Your Basket</Alert>)
            }
            {
                items.length >0 && (<>
                <ul style={{listStyleType:"decimal"}}>
                    {
                        items.map((item)=>(
                            <li key={item._id} style={{marginBottom:20}}>
                                <Link to={"/product/"+item._id}>
                                    <Text fontSize={"xl"}>{item.title} - {item.price} TL</Text>
                                    <Image
                                        htmlWidth={200}
                                        src={item.photos[0]}
                                        alt={"basket item"}
                                        loading={"lazy"}
                                    />
                                </Link>
                                <Button mt={2} size={"sm"} colorScheme={"red"} onClick={()=>removeFromBasket(item._id)}>Remove From Basket</Button>
                            </li>
                        ))
                    }
                </ul>
                    <Box mt={10}>
                        <Text fontSize={"2xl"}>Total : {total} TL</Text>
                    </Box>
                    <Button mt={2} size={"sm"} colorScheme={"cyan"} onClick={onOpen}>Order</Button>
                        <Modal
                            initialFocusRef={initialRef}
                            isOpen={isOpen}
                            onClose={onClose}
                        >
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Order</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                    <FormControl>
                                        <FormLabel>Address</FormLabel>
                                        <Textarea
                                            ref={initialRef}
                                            placeholder='Address'
                                            value={address}
                                            onChange={(e)=>setAddress(e.target.value)} />
                                    </FormControl>

                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme='blue' mr={3} onClick={handleSubmitForm}>
                                        Save
                                    </Button>
                                    <Button onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                </>
                )}

        </Box>
    );
}

export default Basket;