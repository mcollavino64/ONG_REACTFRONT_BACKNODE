import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Box, Skeleton, Text } from '@chakra-ui/react';

import { useSelector } from 'react-redux';
import { publicData, publicLoading } from '../../app/publicInfoSlice';
import { API_BASE_URL } from './../../app/config';

export default function Carousel() {

    const logoColors = ['#DB5752', '#FAFA88', '#9AC9FB'];
    const responsiveBreakpoints = {
        0: {
            items: 1,
        },
        768: {
            items: 2,
        },
        992: {
            items: 3,
        }
    }
    
    const { slides } = useSelector(publicData);
    const listSlides = slides ? slides : [];
    const publicloading = useSelector(publicLoading);
    const isLoading = publicloading === 'pending';
    return (
        <>
            <OwlCarousel
                className='owl-theme'
                loop margin={5}
                responsive={responsiveBreakpoints}
                key = {listSlides?.length}
            >
                {
                    listSlides.map(({ imageUrl, text }, index) => {
                        return (

                            <Box
                                cursor='pointer'
                                key={index}
                                transitionProperty="all"
                                transitionDuration="500ms"
                                boxShadow="2xl"
                                borderRadius="md"
                                overflow="hidden"
                                _hover={{
                                    '.textBox': {
                                        height: 'max-content',
                                        opacity: '1',
                                        visibility: 'visible',
                                        pb: '15px'
                                    }
                                }}

                            >
                                <Skeleton isLoaded={!isLoading} startColor="#FAFA88">
                                    <Box backgroundImage={isLoading ? null : API_BASE_URL + '/' + imageUrl} backgroundSize="cover" height="35vh" />
                                </Skeleton>
                                <Box className="textBox"
                                    bg={logoColors[index%3]}
                                    opacity="0"
                                    visibility="hidden"
                                    height="0px" 
                                    p="0px"
                                    transition='visibility 0s, opacity 500ms linear'

                                >

                                    <Box
                                        opacity="95%"
                                        bg="gray.800"
                                        paddingY="2"
                                        paddingX="5"
                                    >

                                        <Text
                                            as="cite"
                                            fontSize="lg"
                                            color="white"

                                        >
                                            {text}

                                        </Text>

                                    </Box>

                                </Box>

                            </Box>

                        )
                    })
                }
            </OwlCarousel>

        </>
    )
}
