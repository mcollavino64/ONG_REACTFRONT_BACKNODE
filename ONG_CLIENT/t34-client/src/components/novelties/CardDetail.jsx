import React, { useEffect, useState } from 'react'
import { Box, Container, Flex, Spacer, Text, Badge } from '@chakra-ui/react'
import moment from 'moment'
import { useParams } from 'react-router'
import axios from 'axios'
import { API_BASE_URL } from './../../app/config';
import { HStack } from '@chakra-ui/layout';


export default function CardDetail() {

  const [data, setData] = useState({})
  const {id} = useParams();

  useEffect(() => {
    (async () => {
      const res = await axios.get(`${API_BASE_URL}/news/${id}`)
       console.log('data: ', res.data.category)
      setData(res.data);
    })()
  }, [])


  return (
    <Container maxW="container.lg" >
      <Box w="100%" borderWidth="6px" borderRadius="lg" boxShadow="xl" >

        <Box  backgroundImage={API_BASE_URL + '/' + data.image} backgroundSize="cover" height="75vh" />

        <Box  padding="5" bg="gray.200">
          <HStack justify="space-between">
            <Text
              fontWeight="semibold"
              fontSize={{ base: "2xl", sm: "3xl", lg: "4xl" }}
              as="em"
            >
              {data.name}
            </Text>
            <Text>
              <Badge colorScheme="red" fontSize="1.2em" mr="2" >{data.category?.name}</Badge>
              {moment(data.createAd).format('LL')}
            </Text>
          </HStack>
          <Box
            letterSpacing="wide"
            fontSize="xl"
            ml="2"
          >
            {data.content}
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
