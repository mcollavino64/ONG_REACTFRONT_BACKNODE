import React from 'react';
import { Button } from '@chakra-ui/button'
import { Text, VStack } from '@chakra-ui/layout'
import AlertService from '../alertService/AlertService'
import utils from './updateUserInfo'

function ChangePassword({ userData }) {

    const ShowAlertResultMsg = (field, isOk) => {
        if (isOk) {
            AlertService.success("Resultado", `Campo ${field} actualizado`)

        } else {
            AlertService.error("Resultado", `No se ha podido actualizar el campo ${field}`)
        }
    }

    const handleClick = async () => {
        const currentPassword = await AlertService.inputPassword("Ingrese su contraseña actual")
        if (currentPassword) {
            const newPassword = await AlertService.inputPassword("Ingrese la nueva contraseña")
            /* Call API to validate the current Password & Update it with the new Password */
            const result = await utils.validatePassword(currentPassword, userData.email)
            console.log(result)
            if (!result) {
                AlertService.error("Error", "La contraseña actual ingresada es errónea")
            }
            else {
                const result = await utils.updateUserPassword(newPassword, userData)
                if (result.status !== 200) {
                    setTimeout(ShowAlertResultMsg("Contraseña", false), 2000);
                }
                else {
                    setTimeout(ShowAlertResultMsg("Contraseña", true), 2000);
                }
            }
        }
    }

    return (
        <VStack spacing={5} p="20px">
            <Text fontSize="1rem">CONTRASEÑA</Text>
            <Button
                colorScheme="blue"
                onClick={handleClick}
                width="auto"
                textAlign="center"
                display="inline-block"
                p={3}
            >
                Cambiar contraseña
            </Button>
        </VStack>
    )
}


export default ChangePassword