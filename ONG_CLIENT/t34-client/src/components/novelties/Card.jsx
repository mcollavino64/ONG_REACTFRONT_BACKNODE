import { Badge, Box, Text } from '@chakra-ui/react'
import React from 'react'

export default function Card(props) {
  return (
    <Box w="100%" borderWidth="4px" borderRadius="lg" boxShadow="xl">

      <Box backgroundImage={props.imageUrl} backgroundSize="cover" height="35vh" />

      <Box padding="3" bg="gray.300">
        <Text
          fontWeight="semibold"
          fontSize={{ base: "2xl", sm: "3xl", lg: "4xl" }}
          as="em"
        >
          {props.title}

          {((props.index === 0) || (props.index === 1)) && <Badge borderRadius="full" opacity="80%" px="2" mx="1" colorScheme="teal">
            New
          </Badge>}

        </Text>

        <Box d="flex" alignItems="baseline" >
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {props.createAt}
          </Box>
        </Box>

        
      </Box>
    </Box>
  )
}
