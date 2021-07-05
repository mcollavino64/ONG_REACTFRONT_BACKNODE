/*
  Button used on auth forms

  Props:
    isLoading: boolean to indicate loading status (true for loading)
    all the other props will be spread on a chakra's <Button> component
*/

import * as React from 'react';
import { Button } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';

function AuthSubmitButton({ isLoading, children, ...props }) {
  return (
    <Button
      w='full'
      borderRadius='full'
      size='md'
      mt={4}
      fontWeight='medium'
      fontSize='lg'
      color='white'
      _hover={{ bg: 'gray.900' }}
      bg='gray.700'
      py={6}
      isLoading={isLoading}
      {...props}>
      {children}
    </Button>
  );
}

AuthSubmitButton.defaultProps = {
  isLoading: false,
  children: null,
}

AuthSubmitButton.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node
}

export default AuthSubmitButton;