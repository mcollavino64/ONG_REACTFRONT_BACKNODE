import React from 'react';
import { Box, Center } from '@chakra-ui/layout';
import ContactoForm from './ContactoForm';
import ContactoMsg from './ContactoMsg';
import './style.css';

export default function Contacto() {
  return (
    <Center d='flex' flexDirection='column' py={8}>
      <Box
        mb={5}
        display={{ lg: 'flex' }}
        border='1px'
        shadow='sm'
        bg="white"
        borderColor='gray.200'
        py={8}
        width={{ base: '95%', lg: '90%', xl: '80%' }}
        rounded='xl'>
        <ContactoMsg />
        <ContactoForm />
      </Box>
    </Center>
  );
}
