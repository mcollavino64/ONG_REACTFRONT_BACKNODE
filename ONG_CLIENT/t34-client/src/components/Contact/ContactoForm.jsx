import React, { useState } from 'react';
import { Button, Textarea } from '@chakra-ui/react';
import { Box, Center, Stack, Text, VStack } from '@chakra-ui/layout';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { EditIcon, EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';
import axios from 'axios';
import { API_BASE_URL } from '../../app/config';
import Alert from '../alertService/AlertService';
import Loader from '../Loading/Loader';
import { RiSendPlaneFill } from 'react-icons/ri';
import { IoIosSend } from 'react-icons/io';

export default function ContactoForm() {
  const [isLoading, setLoading] = useState(false);

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };

  const onSubmit = (values) => {
    setLoading(true);
    axios
      .post(`${API_BASE_URL}/contacts`, values)
      .then((result) => {
        setLoading(false);
        if (!result.data?.ok) {
          Alert.error('Ups', 'Hubo un problema. Intente nuevamente más tarde');
          return;
        } else {
          Alert.success(
            'Listo',
            'Sus datos han sido registrados con éxito. Pronto recibirá un mail con más información.',
            'Continuar'
          );
        }
      })
      .catch((error) => {
        setLoading(false);
        Alert.error('Ups', 'Hubo un problema. Intente nuevamente más tarde');
      });
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('* El nombre es requerido'),
    email: Yup.string().email('El email no es válido').required('* El email es requerido'),
    phone: Yup.number(),
    message: Yup.string(),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <VStack width={{base:"100%", lg:'75%', xl: "65%"}}  borderLeft="1px" borderColor="gray.200" mt={{base: "2rem", lg: "0"}}>
      <Loader isLoading={isLoading} />

      <Box width={{base:"90%", lg:'80%', xl: "75%"}}>
        <form onSubmit={formik.handleSubmit}>
          <Box fontSize='3xl' align='center' fontWeight='bold' mb={9} borderBottom="2px" borderColor="blue.100" pb={2}>
            Envíanos un mensaje
          </Box>
          <Stack spacing={4}>
            <InputGroup>
              <InputLeftElement pointerEvents='none' children={<EditIcon color='gray.300' />} />
              <Input
                type='text'
                placeholder='* Nombre completo'
                id='name'
                name='name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </InputGroup>
            {formik.touched.name && formik.errors.name ? <TextError props={formik.errors.name} /> : null}

            <InputGroup>
              <InputLeftElement pointerEvents='none' children={<EmailIcon color='gray.300' />} />
              <Input
                type='email'
                id='email'
                name='email'
                placeholder='* Email de contacto'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </InputGroup>
            {formik.touched.email && formik.errors.email ? <TextError props={formik.errors.email} /> : null}

            <InputGroup>
              <InputLeftElement pointerEvents='none' children={<PhoneIcon color='gray.300' />} />
              <Input
                type='number'
                id='phone'
                name='phone'
                placeholder='Número de teléfono'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
            </InputGroup>

            <Textarea
              id='message'
              name='message'
              placeholder='Escribe tu mensaje'
              resize='none'
              rows='7'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
            />
          </Stack>
          <Center mt='3'>
            <Button
              type='submit'
              borderRadius='full'
              size='md'
              leftIcon={<IoIosSend />}
              mt={4}
              py={6}
              color='white'
              bg='gray.700'
              fontSize='lg'
              boxShadow='md'
              _hover={{ bg: 'gray.900' }}>
              Contactarse
            </Button>
          </Center>
        </form>
      </Box>
    </VStack>
  );
}
