/*
  Register Page

  Contains components/authentication/RegisterForm

  Important function:
    handleRegisterSubmit - will be called on register form submit after input validation
*/

import { Center, Link } from '@chakra-ui/layout';
import * as React from 'react';
import { VStack, HStack, Text } from '@chakra-ui/react';
import Logo from '../components/layout/Logo';
import RegisterForm from '../components/authentication/RegisterForm';
import AuthBox from '../components/authentication/AuthBox';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import axios from 'axios';
import Alert from './../components/alertService/AlertService';
import { API_BASE_URL } from './../app/config';
import { useDispatch } from 'react-redux';
import { logIn } from '../features/login/loginSlice'

export default function RegisterPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  // On register form submit
  // This callback will only be called after successful validation with the login information
  const handleRegisterSubmit = (values, actions) => {
    // Shape of values: { firstName: string, lastName: string, email: string, password: string }

    axios.post(`${API_BASE_URL}/users/auth/register`, values).then((result) => {
      if (result.data.errors) {
        // El backend nos respondio con un error
        Alert.error('Error', 'Ha ocurrido un error');

        actions.setSubmitting(false); // Desactiva el icono de cargando del boton
        return;
      }
      else {
        Alert.success('Hecho', 'Se ha registrado correctamente');
        // Registro exitoso
        dispatch(logIn({ token: result.data?.token, roleId: result.data?.roleId, userId: result.data?.userId }))
        history.push("/"); // Redirecciona a home
      }
    }).catch((error) => {
      Alert.error('Error', 'Ha ocurrido un error');

      actions.setSubmitting(false);
    });
  };

  // On logo click
  const handleLogoClick = () => {
    history.push('/');
  };

  return (
    <Center
      h='100vh'
      bg='gray.100'
      w='100%'
      d='flex'
      position='relative'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'>
      {/* Logo */}
      <Logo onClick={handleLogoClick} cursor='pointer' mb='20px' mt={{ base: '30px', md: '10px' }} />

      {/* Box */}
      <AuthBox maxW='md' position='relative'>
        <VStack
          w={{ base: '90%', sm: '80%' }}
          d='flex'
          alignItems='center'
          spacing={3}
          justifyContent='center'
          textAlign='center'>
          {/* Box header */}
          <Text fontSize='4xl' fontWeight='medium'>
            Registrarme
          </Text>

          <Text fontSize="smaller">Rellena con tus datos para crear una nueva cuenta</Text>

          <div />

          {/* Form */}
          <RegisterForm onRegisterSubmit={handleRegisterSubmit} />

        </VStack>
      </AuthBox>

      {/* Bottom text */}
      <HStack mt='40px' mb="20px">
        <Text>¿Ya tienes una cuenta?</Text>
        <Link as={RouterLink} to='/acceso' fontWeight='semibold'>
          Iniciar sesión
        </Link>
      </HStack>
    </Center>
  );
}
