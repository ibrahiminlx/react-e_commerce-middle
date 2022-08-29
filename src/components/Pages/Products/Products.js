import React from 'react';
import Card from "../../Card/Card";
import {Box, Button, Flex, Grid} from "@chakra-ui/react"
import {useInfiniteQuery} from "react-query"
import {fetchProductList} from "../../../api";

function Products(props) {
    const { data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,} = useInfiniteQuery('products',fetchProductList,{
        getNextPageParam: (lastGroup, allGroups) => {
            const morePagesExits=lastGroup?.length===12
            if (!morePagesExits){
                return
            }
            return allGroups.length+1
        }
    })

    if (status==="loading") return 'Loading...'

    if (status==="error") return 'An error has occurred: ' + error.message


    return (
        <div>
            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                {
                    // data.map((item,index)=>(
                    //     <Card key={index} item={item}/>
                    // ))
                }
                {data.pages.map((group, i) => (
                    <React.Fragment key={i}>
                        {group.map((item) => (
                            <Box w={"100%"}  key={item._id}>
                                <Card item={item}></Card>
                            </Box>
                        ))}
                    </React.Fragment>
                ))}

            </Grid>
            <Flex mt={"10px"} justifyContent={"center"}>
                <Button colorScheme={"cyan"}
                        isLoading={isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                >
                    {isFetchingNextPage
                        ? 'Loading more...'
                        : hasNextPage
                            ? 'Load More'
                            : 'Nothing more to load'}
                </Button>
            </Flex>
            <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
        </div>
    );
}

export default Products;