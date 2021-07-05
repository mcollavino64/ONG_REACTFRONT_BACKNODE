/*
  Simple login form with email & password validation

  Usage:
    <LoginForm onLoginSubmit={(values, actions) => {}}/>

  Props:
    onLoginSubmit: function(values, actions) - will be called on login form submit AFTER validation. values will be the object containing all the inputs VALIDATED
*/

import * as React from 'react';
import { FormControl, FormErrorMessage, Box, VStack } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import AuthSubmitButton from './AuthSubmitButton';
import AuthInput from './AuthInput';
import { PropTypes } from 'prop-types';
import { validateEmail, validatePassword } from './formValidators';

function LoginForm({ onLoginSubmit, ...props }) {
  return (
    <Box w='full' {...props}>
      <Formik initialValues={{}} onSubmit={onLoginSubmit}>
        {(props) => (
          <Form>
            <VStack spacing={5}>
              {/* Email input */}
              <Field name='email' validate={validateEmail}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.email && form.touched.email}>
                    <AuthInput Icon={EmailIcon} type='email' {...field} id='email' placeholder='Email' />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Password input */}
              <Field name='password' validate={validatePassword}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.password && form.touched.password}>
                    <AuthInput Icon={LockIcon} type='password' {...field} id='password' placeholder='Contraseña' />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Login Button */}
              <AuthSubmitButton type='submit' isLoading={props.isSubmitting}>
                Iniciar sesión
              </AuthSubmitButton>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

LoginForm.defaultProps = {
  onLoginSubmit: null,
}

LoginForm.propTypes = {
  onLoginSubmit: PropTypes.func
}

export default LoginForm;