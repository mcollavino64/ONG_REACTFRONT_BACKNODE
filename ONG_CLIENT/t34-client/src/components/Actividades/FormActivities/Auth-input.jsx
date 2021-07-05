import * as React from 'react';
import { Input, InputGroup, InputLeftElement, Icon as IconChakra } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';
import { useField,  } from 'formik';

function AuthInput({Icon, ...props }) {
    const [field, meta] = useField(props);
  return (
    <InputGroup>
      <InputLeftElement pointerEvents='none' children={Icon ? <IconChakra as={Icon} mt='6px' color='gray.300' /> : null} />
      <Input {...field} {...props} size='lg' borderColor='gray.300' />
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