import React, { useState, useEffect } from 'react';
import { Box, Grid, GridItem, Text } from '@chakra-ui/layout';
import Card from '../components/testimonials/Card'
import axios from 'axios';
import { API_BASE_URL } from '../app/config';


export default function Testimonials() {

  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    (async function getEntries() {
      const testimonials = await axios.get(`${API_BASE_URL}/testimonials`);
      setTestimonials(testimonials.data);
      console.log(testimonials.data);
    })();
  }, [])


  return (
    <Box mt="8" display="flex" justifyContent="center" w="100%">

      <Box
        bg="blue.100" h="max-content"
        w={{ base: "100%", lg: "80%" }} >

        <Box bg="blue.200" textAlign="center">

          <Text fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}
            align="center" fontWeight="bold"
            mb={2} w="100%" textTransform="uppercase"
            textShadow="1.5px 2px 3px gray">
            Testimonios
          </Text>

        </Box>

        {(!testimonials || testimonials.length === 0) && <Text mt={16}>No se pudo cargar ningún testimonio</Text>}

        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
          gap={6}
          p={{ base: "5", lg: "10" }}
        >


          {
            testimonials.map((testimonio) => (


              <GridItem colSpan={1} cursor="pointer" borderRadius="lg" _hover={{
                transform: 'scale(1.05)', transitionProperty: 'all',
                transitionDuration: '0.5s',
                borderWidth: "4px", borderColor: "teal.300"
              }}>
                <Card testimonio={testimonio} />
              </GridItem>


            ))
          }
        </Grid>
      </Box>
    </Box>
  )
}
