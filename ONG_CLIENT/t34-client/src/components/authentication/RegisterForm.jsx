/*
  Simple register form with validation

  Usage:
    <RegisterForm onRegisterSubmit={(values, actions) => {}}/>

  Props:
    onRegisterSubmit: function(values, actions) - will be called on register form submit AFTER validation. values will be the object containing all the inputs VALIDATED
*/

import * as React from 'react';
import { FormControl, FormErrorMessage, Box, VStack, Checkbox, Link } from '@chakra-ui/react';
import { Field, Form, Formik, useFormikContext } from 'formik';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import AuthSubmitButton from './AuthSubmitButton';
import AuthInput from './AuthInput';
import { PropTypes } from 'prop-types';
import { validateEmail, validatePassword, validateConfirmPassword, validateName, validateTermsAgreement } from './formValidators';
import { HStack } from '@chakra-ui/react';
import { HiPencil } from 'react-icons/hi';

function RegisterForm({ onRegisterSubmit, ...props }) {
  return (
    <Box w='full' {...props}>
      <Formik initialValues={{ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", termsAgreement: false}} onSubmit={onRegisterSubmit}>
        {(props) => (
          <Form>
            <VStack spacing={5}>

              <HStack>
              {/* Firstname input */}
              <Field name='firstName' validate={validateName}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.firstName && form.touched.firstName}>
                    <AuthInput Icon={HiPencil} type='text' {...field} id='firstName' placeholder='Nombre' />
                    <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Lastname input */}
              <Field name='lastName' validate={validateName}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.lastName && form.touched.lastName}>
                    <AuthInput Icon={HiPencil} type='text' {...field} id='lastName' placeholder='Apellido' />
                    <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field></HStack>

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

              {/* Confirm password input */}
              <Field name='confirmPassword' validate={(value) => validateConfirmPassword(value, props.values.password)}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
                    <AuthInput
                      Icon={LockIcon}
                      type='password'
                      {...field}
                      id='confirmPassword'
                      placeholder='Confirmar contraseña'
                    />
                    <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Terms & condition agreement input */}
              <Field name='termsAgreement' validate={validateTermsAgreement}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.termsAgreement && form.touched.termsAgreement}>
                    <Checkbox
                      {...field}
                      id='termsAgreement'
                    >Acepto los <Link fontWeight="semibold">Términos y Condiciones</Link></Checkbox>
                    <FormErrorMessage>{form.errors.termsAgreement}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Login Button */}
              <AuthSubmitButton type='submit' isLoading={props.isSubmitting}>
                Crear cuenta
              </AuthSubmitButton>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

RegisterForm.defaultProps = {
  onRegisterSubmit: null,
};

RegisterForm.propTypes = {
  onRegisterSubmit: PropTypes.func,
};

export default RegisterForm;
