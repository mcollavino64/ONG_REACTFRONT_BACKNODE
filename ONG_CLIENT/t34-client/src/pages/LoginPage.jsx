/*
  Login Page

  Contains components/authentication/LoginForm

  Important function:
    handleLoginSubmit - will be called on login form submit after input validation
*/

import { Center, Link } from '@chakra-ui/layout';
import * as React from 'react';
import { VStack, HStack, Text } from '@chakra-ui/react';
import Logo from './../components/layout/Logo';
import LoginForm from './../components/authentication/LoginForm';
import AuthBox from '../components/authentication/AuthBox';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from './../app/config';
import Alert from './../components/alertService/AlertService';
import { useDispatch } from 'react-redux';
import { logIn } from '../features/login/loginSlice';

export default function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  // On login form submit
  // This callback will only be called after successful validation with the login information
  const handleLoginSubmit = (values, actions) => {
    // Shape of values: { email: string, password: string }

    // TODO: Sacar este timeout y hacer una llamada al backend
    // setTimeout(() => {
    //   alert(JSON.stringify(values, null, 2));
    //   actions.setSubmitting(false); // Set form loading state to false
    // }, 1000);

    axios.post(`${API_BASE_URL}/users/auth/login`, values).then((result) => {

      if (!result.data?.token) {
        Alert.error('Error', 'No ha logrado ingresar, verifique los datos', 'OK');
        actions.setSubmitting(false);
        return;
      }
      else {
        history.push("/");
        Alert.success('Hecho', 'Ha  iniciado sesión correctamente');
        dispatch(logIn({ token: result.data?.token, roleId: result.data?.roleId, userId: result.data?.userId }))
      }
    }).catch((error) => {
      Alert.error('Incorrecto', 'El mail o la contraseña son incorrectos');
      actions.setSubmitting(false);
    });

  };

  // On logo click
  const handleLogoClick = () => {
    history.push('/');
  };

  return (
    <Center
      h="100vh"
      bg='gray.100'
      w='100%'
      d='flex'
      position='relative'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'>
      {/* Logo */}
      <Logo onClick={handleLogoClick} cursor='pointer' mb='35px' mt={{ base: '35px', md: '0px' }} />

      {/* Box */}
      <AuthBox maxW='md' position='relative'>
        <VStack
          w={{ base: '90%', sm: '80%' }}
          d='flex'
          alignItems='center'
          spacing={5}
          justifyContent='center'
          textAlign='center'>
          {/* Box header */}
          <Text fontSize='4xl' fontWeight='medium'>
            Iniciar sesión
          </Text>

          {/* Form */}
          <LoginForm onLoginSubmit={handleLoginSubmit} />

          {/* Box footer */}
          <Link as={RouterLink} to='/recuperar-contraseña' fontWeight='semibold'>
            Olvidé mi contraseña
          </Link>
        </VStack>
      </AuthBox>

      {/* Bottom text */}
      <HStack mt='40px' mb={{ base: '0px', md: '100px' }}>
        <Text>¿Necesitas crear una cuenta?</Text>
        <Link as={RouterLink} to='/registro' fontWeight='semibold'>
          Registrarme
        </Link>
      </HStack>
    </Center>
  );
}
