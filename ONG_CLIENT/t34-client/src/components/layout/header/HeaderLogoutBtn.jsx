import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { logOut } from '../../../features/login/loginSlice';
import Alert from './../../alertService/AlertService';

export default function({children, ...props}) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logOut());
    history.push("/");
    Alert.success("Hecho", "Ha cerrado sesión exitosamente");
  }

  return <Button {...props} onClick={handleLogout}>{children}</Button>
}