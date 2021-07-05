import React from 'react';
import { Stack } from '@chakra-ui/layout';
import InputText from './InputText'
import AlertService from '../alertService/AlertService'
import utils from './updateUserInfo'

export default function UserInputs({ userData }) {

    const ShowAlertResultMsg = (field, isOk) => {
        if (isOk) {
            AlertService.success("Resultado", `Campo ${field} actualizado`)

        } else {
            AlertService.error("Resultado", `No se ha podido actualizar el campo ${field}`)
        }
    }

    const handleNameClick = async (event) => {
        const inputValue = event.target.parentNode.parentNode.childNodes[1].value
        console.log(inputValue)
        const newName = await AlertService.inputText("Actualizar Nombre")
        const validate = (/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/).test(newName)
        if (newName && validate) {
            console.log(newName)
            const result = await utils.updateUserName(newName, userData)
            if (result.status !== 200) {
                setTimeout(ShowAlertResultMsg("Nombre", false), 1000);
            }
            else {
                setTimeout(ShowAlertResultMsg("Nombre", true), 1000);
            }
        } else {
            AlertService.error(`El nombre no es válido <br /> 
            Asegurese de escribir la primera letra en mayúscula`)
        }

    }

    const handleSurnameClick = async (event) => {
        const inputValue = event.target.parentNode.parentNode.childNodes[1].value
        console.log(inputValue)
        const newSurname = await AlertService.inputText("Actualizar Apellido")
        const validate = (/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/).test(newSurname)
        if (newSurname && validate) {
            console.log(newSurname)
            const result = await utils.updateUserLastName(newSurname, userData)
            if (result.status !== 200) {
                setTimeout(ShowAlertResultMsg("Apellido", false), 1000);
            }
            else {
                setTimeout(ShowAlertResultMsg("Apellido", true), 1000);
            }
        }
        else {
            AlertService.error(`El apellido no es válido <br /> 
            Asegurese de escribir la primera letra en mayúscula`)
        }
    }

    const handleEmailClick = async (event) => {
        const inputValue = await event.target.parentNode.parentNode.childNodes[1].value
        console.log(inputValue)
        const newEmail = await AlertService.inputText("Actualizar Email")
        const validate = (/^[\w]+@{1}[\w]+\.[a-z]{2,3}$/).test(newEmail)
        if (newEmail && validate) {
            console.log(newEmail)
            const result = await utils.updateUserEmail(newEmail, userData)
            if (result.status !== 200) {
                setTimeout(ShowAlertResultMsg("Email", false), 1000);
            }
            else {
                setTimeout(ShowAlertResultMsg("Email", true), 1000);
            }
        } else {
            AlertService.error(`El email no es válido`)
        }
    }

    return (
        <Stack spacing={3}>
            <InputText
                name={"NOMBRE DEL USUARIO"}
                userData={userData.firstName}
                handler={handleNameClick}
            />
            <InputText
                name={"APELLIDO DEL USUARIO"}
                userData={userData.lastName}
                handler={handleSurnameClick}
            />
            <InputText
                name={"CORREO ELECTRONICO"}
                userData={userData.email}
                handler={handleEmailClick}
            />

        </Stack>
    );
}