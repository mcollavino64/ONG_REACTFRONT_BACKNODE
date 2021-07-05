/*
  Simple box used to contain auth forms 

  <AuthBox>children elements</AuthBox>
*/

import * as React from 'react';
import { Box } from '@chakra-ui/layout';
import { PropTypes } from 'prop-types';

function AuthBox({ children, ...props }) {
  return (
    <Box
      w='full'
      h='fit-content'
      bg='white'
      py={7}
      boxShadow='xl'
      borderWidth='1px'
      borderColor='gray.200'
      borderRadius='xl'
      d='flex'
      justifyContent='center'
      justifyItems='center'
      {...props}>
      {children}
    </Box>
  );
}

AuthBox.defaultProps = {
  children: null,
}

AuthBox.propTypes = {
  children: PropTypes.node,
}

export default AuthBox;
