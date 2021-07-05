/*
  Input used on authentication forms

  Usage:
    <AuthInput>

  Props:
    Icon: Node - optional icon to be displayed on the left (chakra icons)
    all other props will be spread on a chakra's <Input> component
*/

import * as React from 'react';
import { Input, InputGroup, InputLeftElement, Icon as IconChakra } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';

function AuthInput({Icon, ...props }) {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents='none' children={Icon ? <IconChakra as={Icon} mt='6px' color='gray.300' /> : null} />
      <Input size='lg' borderColor='gray.300' {...props} />
    </InputGroup>
  );
}

AuthInput.defaultProps = {
  Icon: null,
}

AuthInput.propTypes = {
  Icon: PropTypes.node,
}

export default AuthInput;