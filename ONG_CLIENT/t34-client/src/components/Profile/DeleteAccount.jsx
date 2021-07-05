import React from 'react';
import { Button } from '@chakra-ui/button'
import { Text, VStack } from '@chakra-ui/layout'
import AlertService from '../alertService/AlertService'
import deleteUserAccount from './deleteUserAccount'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logOut } from '../../features/login/loginSlice'


function DeleteAccount() {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.clear();
        dispatch(logOut());
        history.push("/");
        AlertService.success("Hecho", "Ha eliminado su cuenta exitosamente");
    }

    const handleClick = async () => {
        const res = await AlertService.confirm("Eliminar cuenta", "¿Está seguro de que quiere eliminar su cuenta de usuario?")
        if (res) {
            const res = await deleteUserAccount()
            if (!res) {
                AlertService.error("Error", "Hubo un error al intetar eliminar su cuenta")
            }
            else {
                handleLogout();
            }
        }
    }

    return (
        <VStack spacing={5} p="20px">
            <Text fontSize="1rem">
                SUSPENDER CUENTA
            </Text>

            <Button
                colorScheme="red"
                onClick={handleClick}
                width="auto"
                textAlign="center"
                display="inline-block"
                p={3}
            >
                Eliminar cuenta
            </Button>

        </VStack>
    )
}

export default DeleteAccount