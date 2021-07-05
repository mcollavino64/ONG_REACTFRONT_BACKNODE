import React from 'react';
import { useFormik } from 'formik';
import {
  FormControl,
  Image,
  Box,
  Button,
  FormLabel,
  Input,
  Heading,
  Stack,
  InputLeftElement,
  InputGroup,
  Icon,
  Container,
  Text,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { Center } from '@chakra-ui/layout';

export default function EditOrganization() {
  // regex para validar que la URL provista sea de una imagen
  const URL =
    /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i;

  //props de formik
  const formik = useFormik({
    initialValues: {
      ongName: 'Somos Mas',
      logo: 'https://firebasestorage.googleapis.com/v0/b/ragemp-ddbb9.appspot.com/o/logo.png?alt=media&token=dd5a75bc-fde7-4798-a3fe-94d3b467bb5a', // logo de ejemplo para testear
    },
    validatationSchema: Yup.object().shape({
      ongName: Yup.string().required('Ingresar un nombre'),
      logo: Yup.string().matches(URL, 'Ingresar una URL válida'),
    }),
    onSubmit: (formData) => {
      console.log(formData);
    },
  });

  return (
    <Center d="flex" flexDirection="column" mt='12'>
      <Heading as="h1" size="xl" mb={5}>
        Organización
      </Heading>

      <Container
        maxWidth='xl'
        border='gray.100 solid 1px'
        
        centerContent
        bg='white'
        py={6}
        rounded='lg'
        shadow='lg'>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={5} w="full">
            <FormControl isRequired isInvalid={formik.errors.ongName && formik.touched.ongName}>
              <FormLabel fontSize='15'> Nombre de la organización</FormLabel>
              <InputGroup>
                <InputLeftElement children={<Icon name='EditIcon' />} />
                <Input
                  type='text'
                  name='ongName'
                  id='ongName'
                  placeholder='Editar nombre de la organización'
                  value={formik.values.ongName}
                  onChange={formik.handleChange}
                />
              </InputGroup>
            </FormControl>

            <FormControl isRequired isInvalid={formik.errors.logo && formik.touched.logo}>
              <FormLabel fontSize='15'> Logo de la organización </FormLabel>
              <InputGroup>
                <InputLeftElement children={<Icon name='info' />} />
                <Input
                  type='text'
                  id='logo'
                  name='logo'
                  placeholder='URL del logotipo'
                  value={formik.values.logo}
                  onChange={formik.handleChange}
                />
              </InputGroup>
              <Box d='flex' w='full' justifyContent='center' mt={5}>
                <Image src={formik.values.logo} alt='' />
              </Box>
            </FormControl>
            <Button
              mt={5}
              type='submit'
              bg='gray.700'
              color='white'
              borderRadius='full'
              _hover={{ background: '#265acc' }}>
              Guardar Cambios
            </Button>
          </Stack>
        </form>
      </Container>
    </Center>
  );
}
